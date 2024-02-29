export const createUser = async({username, hashedPassword}) => {
  console.log(username, hashedPassword)
  try {
    const [result] = await connection.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [username, hashedPassword]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

DEBERIA QDAR ASI COMO ARRIBA




static async createSale({ input }) {
  const {
    firstName,
    lastName,
    address,
    streetNumber,
    city,
    province,
    books,
    totalAmount,
  } = input;

  const [uuidResult] = await connection.query("SELECT UUID() uuid;");
  const [{ uuid }] = uuidResult;

  try {
    await connection.query(
      `INSERT INTO sale (id, firstName, lastName, address, streetNumber, city, province, totalAmount)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?);`,
      [
        firstName,
        lastName,
        address,
        streetNumber,
        city,
        province,
        totalAmount,
      ]
    );


      // Iterar sobre los libros y agregar información a la tabla sale_books
      for (const book of books) {
        const { bookId, quantity, price } = book;

        await connection.query(
          `INSERT INTO sale_books (sale_id, book_id, quantity, price)
           VALUES (UUID_TO_BIN("${uuid}"), UUID_TO_BIN("${bookId}"), ?, ?);`,
          [bookId, quantity, price]
        );

        // Actualizar el stock de los libros
        const [bookInfo] = await connection.query(
          `SELECT stock FROM book WHERE id = UUID_TO_BIN(?);`,
          [bookId]
        );

        if (bookInfo.length > 0) {
          const currentStock = bookInfo[0].stock;

          if (currentStock >= quantity) {
            await connection.query(
              `UPDATE book SET stock = stock - ? WHERE id = UUID_TO_BIN(?);`,
              [quantity, bookId]
            );
          } else {
            throw new Error(
              `No hay suficiente stock para el libro con ID ${bookId}`
            );
          }
        } else {
          throw new Error(`No se encontró el libro con ID ${bookId}`);
        }
      }
  } catch (error) {
    console.error("Error al crear la venta:", error);
    throw new Error("Error al crear la venta");
  }

  const [sales] = await connection.query(
    `SELECT BIN_TO_UUID(id) as id, firstName, lastName, address, streetNumber, city, province
      FROM sale WHERE id = UUID_TO_BIN(?);`,
    [uuid]
  );

  return sales[0];
}













export class UserModel{
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