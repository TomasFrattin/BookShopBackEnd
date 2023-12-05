import { UserModel } from '../models/mysql/book.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
  static async createUser(req, res) {
    const { username, password } = req.body;
  
    try {

      const existingUser = await UserModel.getUserByName({username});
  
      if (existingUser) {

        return res.status(400).json({ error: 'Nombre de usuario ya está en uso' });
      }
  

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await UserModel.createUser(username, hashedPassword);
  
      res.json({
        msg: 'Usuario creado exitosamente',
        userId: userId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }
  
  

static async getAllUsers(req, res) {
  try {
    const allUsers = await UserModel.getAllUsers();

    res.json(allUsers);
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


static async getUserByName(req, res) {
  try {
    const { username } = req.params;
    const user = await UserModel.getUserByName({ username });


    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario por nombre:', error);
    res.status(500).json({ error: 'Error al obtener usuario por nombre' });
  }
}


  static async updateUser (req, res) {

  };

  static async deleteUser(req, res) {
    const { id } = req.params; 
    try {
      const deleted = await UserModel.deleteUser({ id });

      if (deleted) {
        res.json({ msg: 'Usuario eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }
  

  static async loginUser(req, res) {

    try {
      const { username, password } = req.body;
 
      const user = await UserModel.getUserByName({username});
  
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  

      const token = jwt.sign({
        username: user.nombre,
      }, process.env.SECRET_KEY || 'pepito123');
  
      res.json({
        token,
        message: 'Inicio de sesión exitoso',
        role: user.rol,
        username: user.nombre
      });
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      res.status(500).json({ error: 'Error durante la autenticación' });
    }
  }

}
