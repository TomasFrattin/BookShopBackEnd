// import { randomUUID } from 'node:crypto';
// import { readJSON, writeJSON } from '../../utils.js';

// const users = readJSON('./users.json');

// export class UserModel {
//   static async getAll() {
//     return users;
//   }

//   static async create({ input }) {
//     const newUser = {
//       id: randomUUID(),
//       ...input
//     };

//     users.push(newUser);
//     await writeJSON('./users.json', users);

//     return newUser;
//   }

//   static async delete({ id }) {
//     const userIndex = users.findIndex(user => user.id === id);
//     if (userIndex === -1) return false;

//     users.splice(userIndex, 1);
//     await writeJSON('./users.json', users);

//     return true;
//   }


// }
