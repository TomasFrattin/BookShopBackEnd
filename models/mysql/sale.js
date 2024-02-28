import mysql from "mysql2/promise";

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'bookshopdb'
}
const connection = await mysql.createConnection(config);

export class SaleModel {
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
   
    
    const [sales] = await connection.query(
      'SELECT firstName, lastName, address, streetNumber, city, province, BIN_TO_UUID(id) id FROM sale;'
    )
    return sales
  }
  
  static async createSale({ input }) {
    console.log("paso");
  
    const {
      firstName,
      lastName,
      address,
      streetNumber,
      city,
      province,
    } = input;
  
    const [uuidResult] = await connection.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidResult;
  
    try {
      await connection.query(
        `INSERT INTO sale (id, firstName, lastName, address, streetNumber, city, province)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [
          firstName,
          lastName,
          address,
          streetNumber,
          city,
          province,
        ]
      );
    } catch (e) {
      throw new Error("Error al crear la venta");
    }
  
    const [sales] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, firstName, lastName, address, streetNumber, city, province
        FROM sale WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );
  
    return sales[0];
  }
}
