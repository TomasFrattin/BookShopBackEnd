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