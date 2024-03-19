import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "bookshopdb",
};
const connection = await mysql.createConnection(config);

async function createUser({ username, hashedPassword, firstName, lastName, phoneNumber, address, city, province }) {  

  try {
    const [result] = await connection.query(
      "INSERT INTO usuarios (username, password, firstName, lastName, address, city, province) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, firstName, lastName, phoneNumber, address, city, province]
    );
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const [rows] = await connection.query("SELECT * FROM usuarios");
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByName({ username }) {
  try {
    const [users] = await connection.query(
      "SELECT * FROM usuarios WHERE username = ?;",
      [username]
    );

    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error al obtener usuario por nombre:", error);
    throw error;
  }
}

async function changePassword({ hashedPassword, username }) {
  try {
    await connection.query(
      "UPDATE usuarios SET password = ? WHERE nombre = ?",
      [hashedPassword, username]
    );
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
}

async function deleteUser({ id }) {
  try {
    await connection.query("DELETE FROM usuarios WHERE id = ?;", [id]);
    return true;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return false;
  }
}

export const UserModel = {
  createUser,
  getAllUsers,
  getUserByName,
  changePassword,
  deleteUser,
};
