import prisma from './prismaClient.js';

async function getAll() {
  return await prisma.sale.findMany({
    include: {
      books: true,  // Incluir los libros relacionados en la venta
    },
  });
}

async function createSale({ input }) {
  const { username, books, totalAmount } = input;

  for (const book of books) {
    const { bookId, quantity } = book;

    const bookInfo = await prisma.book.findUnique({
      where: { id: bookId },
      select: { stock: true }
    });

    if (!bookInfo || bookInfo.stock < quantity) {
      throw { status: 400, message: `Stock insuficiente para el libro con ID ${bookId}` };
    }
  }

  try {
    // Buscar el usuario por su `username`
    const usuario = await prisma.usuario.findUnique({
      where: { username },
    });

    if (!usuario) {
      throw new Error(`Usuario con username '${username}' no encontrado`);
    }

    // Crear la venta asociada al usuario
    const sale = await prisma.sale.create({
      data: {
        username,
        totalAmount: parseFloat(totalAmount), // Convertir a número si viene como string
        fechaRegistro: new Date(),
        usuario: {
          connect: { id: usuario.id }, // Conectar la venta al usuario existente
        },
        books: {
          create: books.map(book => ({
            bookId: book.bookId,
            quantity: book.quantity,
            price: book.price,
          })),
        },
      },
      include: {
        books: true,
      },
    });

    // Actualizar stock de los libros
    for (const book of books) {
      const { bookId, quantity } = book;
      const bookToUpdate = await prisma.book.findUnique({
        where: { id: bookId },
      });

      if (bookToUpdate && bookToUpdate.stock >= quantity) {
        await prisma.book.update({
          where: { id: bookId },
          data: { stock: bookToUpdate.stock - quantity },
        });
      } else {
        throw new Error(`Stock insuficiente para el libro con ID ${bookId}`);
      }
    }

    return sale;
  } catch (error) {
    console.error("Error al crear la venta:", error);
    throw new Error("Error al crear la venta");
  }
}

export const SaleModel = {
  getAll,
  createSale,
};
