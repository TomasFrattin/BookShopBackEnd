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

    const [{ id }] = genres;

    const [books] = await connection.query(
      'SELECT title, year, author, price, image, rate, stock, BIN_TO_UUID(id) id FROM book WHERE genreId = ?;', [id]
    );

    return books;
  }
  
  const [books] = await connection.query(
    'SELECT title, year, author, price, image, rate, stock,  BIN_TO_UUID(id) id FROM book;'
  );
  
  return books;
}

  static async getById ({ id }) {
    const [books] = await connection.query(
      `SELECT title, year, author, price, image, rate, stock, BIN_TO_UUID(id) id 
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
      image,
      stock
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO book (id, title, year, author, price, image, rate, stock)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?);`,
        [title, year, author, price, image, rate, stock]
      )
    } catch (error) {
      console.error("Error al crear la venta:", error);
      throw new Error("Error al crear la venta");
    }

    const [books] = await connection.query(
      `SELECT title, year, author, price, image, rate, stock, BIN_TO_UUID(id) id
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
  
  static async updateStock({ id, input }) {
    const { stock } = input;
    
    try {
      await connection.query(
        `UPDATE book
         SET stock = ?
         WHERE id = UUID_TO_BIN(?);`,
        [stock, id]
      );
    } catch (e) {
      console.error('Error al actualizar el stock del libro:', e);
      throw new Error('Error al actualizar el stock del libro');
    }
  
    const [updatedBook] = await connection.query(
      `SELECT title, year, author, price, image, rate, stock, BIN_TO_UUID(id) id
       FROM book WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
  
    return updatedBook[0];
  }
  
static async decreaseStock({ bookId, quantity }) {
  try {
    const [book] = await connection.query(
      `SELECT stock FROM book WHERE id = UUID_TO_BIN(?);`,
      [bookId]
    );

    if (book.length === 0) {
      throw new Error('Libro no encontrado');
    }

    const currentStock = book[0].stock;

    if (currentStock < quantity) {
      throw new Error('No hay suficientes unidades disponibles en stock.');
    }

    await connection.query(
      `UPDATE book SET stock = ? WHERE id = UUID_TO_BIN(?);`,
      [currentStock - quantity, bookId]
    );

    const [updatedBook] = await connection.query(
      `SELECT title, year, author, price, image, rate, stock, BIN_TO_UUID(id) id
       FROM book WHERE id = UUID_TO_BIN(?);`,
      [bookId]
    );

    return updatedBook[0];
  } catch (e) {
    throw new Error(`Error al actualizar el stock del libro: ${e.message}`);
  }
}


}