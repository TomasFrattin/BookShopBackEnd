import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "bookshopdb",
};
const connection = await mysql.createConnection(config);

async function getAll({ genre }) {
  if (genre) {
    const lowerCaseGenre = genre.toLowerCase();

    const [genres] = await connection.query(
      "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
      [lowerCaseGenre]
    );

    if (genres.length === 0) return [];

    const [{ id }] = genres;

    return [];
  }

  const [sales] = await connection.query(
    "SELECT firstName, lastName, address, streetNumber, city, province, BIN_TO_UUID(id) id FROM sale;"
  );
  return sales;
}

async function createSale({ input }) {
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
      `INSERT INTO sale (id, firstName, lastName, address, streetNumber, city, province, totalAmount, fechaRegistro)
       VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
      [firstName, lastName, address, streetNumber, city, province, totalAmount]
    );

    for (const book of books) {
      const { bookId, quantity, price } = book;

      await connection.query(
        `INSERT INTO sale_books (sale_id, book_id, quantity, price)
           VALUES (UUID_TO_BIN("${uuid}"), UUID_TO_BIN("${bookId}"), ?, ?);`,
        [quantity, price]
      );

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

export const SaleModel = {
  getAll,
  createSale,
};
