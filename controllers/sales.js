// salesController.js
const mysql = require('mysql2/promise');
const { connectionConfig } = require('./config'); // Configura esto según tu entorno

async function addSaleToDatabase(saleData) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Insertar la venta en la base de datos
    const [result] = await connection.query(
      'INSERT INTO sales (firstName, lastName, phoneNumber, address, streetNumber, city, province, totalAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        saleData.firstName,
        saleData.lastName,
        saleData.phoneNumber,
        saleData.address,
        saleData.streetNumber,
        saleData.city,
        saleData.province,
        saleData.totalAmount,
      ]
    );

    connection.end(); // Cerrar la conexión después de la consulta

    return result.insertId; // Retorna el ID de la venta insertada
  } catch (error) {
    console.error('Error al agregar venta a la base de datos:', error);
    throw error;
  }
}

module.exports = {
  addSaleToDatabase,
};
