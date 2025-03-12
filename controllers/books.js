import { BookModel } from "../models/mysql/book.js";
import { validateBook } from "../schemas/books.js";

async function getAll(req, res) {
  try {
    const books = await BookModel.getAll();
    res.json(books);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ error: "Error al obtener los libros" });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const book = await BookModel.getById({ id });
    if (book) {
      return res.json(book);
    }
    return res.status(404).json({ message: "Libro no encontrado" });
  } catch (error) {
    console.error("Error al obtener el libro por ID:", error);
    return res.status(500).json({ error: "Error al obtener el libro" });
  }
}

async function create(req, res) {
  const result = validateBook(req.body);  // Asegúrate de que la validación se haga correctamente

  if (!result.success) {
    return res.status(400).json({ error: result.error.message });
  }

  const { title, year, author, price, rate, image, stock, genre } = result.data;
  try {
    const newBook = await BookModel.create({ input: { title, year, author, price, rate, image, stock, genre } });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    return res.status(500).json({ error: "Error al crear el libro" });
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;

  try {
    const result = await BookModel.deleteBook({ id });

    if (!result) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    return res.json({ message: "Libro eliminado" });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    return res.status(500).json({ error: "Error al eliminar el libro" });
  }
}

async function updatePrice(req, res) {
  const { id } = req.params;
  const { input } = req.body;

  try {
    // Asegúrate de que 'input.price' es un número y no una cadena
    const updatedBook = await BookModel.updatePrice({ id, input: { price: parseFloat(input.price) } });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error al actualizar el precio del libro:", error);
    return res.status(500).json({ error: "Error interno al actualizar el precio" });
  }
}

async function updateStock(req, res) {
  const { id } = req.params;
  const { input } = req.body;

  try {
    // Asegúrate de que 'input.stock' es un número y no una cadena
    const updatedBook = await BookModel.updateStock({ id, input: { stock: parseInt(input.stock, 10) } });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error al actualizar el stock del libro:", error);
    return res.status(500).json({ error: "Error interno al actualizar el stock" });
  }
}

export const BookController = {
  getAll,
  getById,
  create,
  deleteBook,
  updatePrice,
  updateStock,
};
