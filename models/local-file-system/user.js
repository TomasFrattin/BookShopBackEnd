import { randomUUID } from 'node:crypto';
import { readJSON, writeJSON } from '../../utils.js';

const users = readJSON('./users.json');

export class UserModel {
  static async getAll() {
    return users;
  }

  static async getById({ id }) {
    const user = users.find(user => user.id === id);
    return user;
  }

  static async create({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input
    };

    users.push(newUser);
    await writeJSON('./users.json', users); // Guardar el estado actualizado

    return newUser;
  }

  static async delete({ id }) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    await writeJSON('./users.json', users); // Guardar el estado actualizado

    return true;
  }

  static async update({ id, input }) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    users[userIndex] = {
      ...users[userIndex],
      ...input
    };

    await writeJSON('./users.json', users); // Guardar el estado actualizado

    return users[userIndex];
  }
}
