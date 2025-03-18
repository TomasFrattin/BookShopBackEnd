import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAll() {
  try {
    return await prisma.book.findMany(); 
  } catch (error) {
    console.error("Error al obtener todos los libros:", error);
    throw new Error("Error al obtener todos los libros");
  }
}

async function getById({ id }) {
  try {
    return await prisma.book.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error al obtener el libro por ID:", error);
    throw new Error("Error al obtener el libro por ID");
  }
}

async function create({ input }) {
  const { title, year, author, price, rate, image, stock, genre } = input;

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        year,
        author,
        price,
        rate,
        image,
        stock,
        genre,
      },
    });
    return newBook;
  } catch (error) {
    console.error("Error al crear el libro:", error);
    throw new Error("Error al crear el libro");
  }
}

async function deleteBook({ id }) {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    if (error.code === "P2003") {
      throw new Error("CONFLICT_SALES");
    }
    throw error;
  }
}



async function updatePrice({ id, input }) {
  const { price } = input;

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        price: parseFloat(price),
      },
    });
    return updatedBook;
  } catch (error) {
    throw new Error("Error al actualizar el precio del libro");
  }
}


async function updateStock({ id, input }) {
  const { stock } = input;

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        stock: parseInt(stock, 10),
      },
    });
    return updatedBook;
  } catch (error) {
    throw new Error("Error al actualizar el stock del libro");
  }
}


async function decreaseStock({ bookId, quantity }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    const currentStock = book.stock;

    if (currentStock < quantity) {
      throw new Error("No hay suficientes unidades disponibles en stock.");
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { stock: currentStock - quantity },
    });

    return updatedBook;
  } catch (e) {
    throw new Error(`Error al disminuir el stock del libro: ${e.message}`);
  }
}

export const BookModel = {
  getAll,
  getById,
  create,
  deleteBook,
  updatePrice,
  updateStock,
  decreaseStock,
};
