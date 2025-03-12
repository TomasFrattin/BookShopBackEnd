import prisma from './prismaClient.js';

async function createUser({ username, hashedPassword, firstName, lastName, address, city, province, rol = "user" }) {
  try {
    const user = await prisma.usuario.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        address,
        city,
        province,
        rol, 
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}


async function getAllUsers() {
  try {
    const users = await prisma.usuario.findMany();
    return users;
  } catch (error) {
    throw error;
  }
}


async function getUserByName({ username }) {
  try {
    const user = await prisma.usuario.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    throw error;
  }
}


async function changePassword({ hashedPassword, username }) {
  try {
    const user = await prisma.usuario.update({
      where: { username },
      data: { password: hashedPassword },
    });
    return user;
  } catch (error) {
    throw error;
  }
}


async function deleteUser({ username }) {
  try {
    const user = await prisma.usuario.delete({
      where: { username },
    });
    return user;
  } catch (error) {
    throw error;
  }
}


export const UserModel = {
  createUser,
  getAllUsers,
  getUserByName,
  changePassword,
  deleteUser,
};
