import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'bookshopdb'
}

const connection = await mysql.createConnection(config)

export class BookModel {
  static async getAll ({ genre }) {
    if(genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      return []
    }
   
    
    const [books] = await connection.query(
      'SELECT title, year, author, price, image, rate, BIN_TO_UUID(id) id FROM book;'
    )
    return books
  }

  static async getById ({ id }) {
    const [books] = await connection.query(
      `SELECT title, year, author, price, image, rate, BIN_TO_UUID(id) id 
      FROM book WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (books.length === 0) return null

    return books[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      author,
      price,
      rate,
      image
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO book (id, title, year, author, price, image, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, author, price, image, rate]
      )
    } catch (e) {
      throw new Error('Error al crear el libro')
    }

    const [books] = await connection.query(
      `SELECT title, year, author, price, image, rate, BIN_TO_UUID(id) id
        FROM book WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return books[0]
  }
  

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM book WHERE id = UUID_TO_BIN(?);',
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      return false;
    }
  }

  static async update ({ id, input }) {
    // Falta hacer
  }
}