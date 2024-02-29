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

  static async updatePrice ({ id, input }) {
    const { price } = input; 
  
    try {
      await connection.query(
        `UPDATE book
         SET price = ?
         WHERE id = UUID_TO_BIN(?);`,
        [price, id]
      );
    } catch (e) {
      throw new Error('Error al actualizar el precio del libro');
    }
  
    const [updatedBook] = await connection.query(
      `SELECT title, year, author, price, image, rate, BIN_TO_UUID(id) id
       FROM book WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
  
    return updatedBook[0];
  }
  

}

export class UserModel {
  static async createUser({username, hashedPassword}) {
    console.log(username, hashedPassword)
    try {
      const [result] = await connection.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [username, hashedPassword]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await connection.query('SELECT * FROM usuarios');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByName({username}) {
    try {
      const [users] = await connection.query(
        'SELECT * FROM usuarios WHERE nombre = ?;',
        [username]
      );

      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error al obtener usuario por nombre:', error);
      throw error;
    }
  }
  
  static async changePassword({ hashedPassword, username }) {
    
    console.log(hashedPassword, username)
    
    try {

    await connection.query('UPDATE usuarios SET password = ? WHERE nombre = ?', [hashedPassword, username]);

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  static async deleteUser ({ id }) {
    try {
      await connection.query(
        'DELETE FROM usuarios WHERE id = ?;',
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      return false;
    }
  }
}