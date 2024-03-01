import { BookModel } from "../models/mysql/book.js";
import { validateBook, validatePartialBook } from "../schemas/books.js";

async function getAll(req, res) {
  const books = await BookModel.getAll();
  res.json(books);
}

async function getById(req, res) {
  const { id } = req.params;
  const book = await BookModel.getById({ id });
  if (book) return res.json(book);
  res.status(404).json({ message: "Libro no encontrado" });
}

async function create(req, res) {
  const result = validateBook(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newBook = await BookModel.create({ input: result.data });

  res.status(201).json(newBook);
}

async function deleteBook(req, res) {
  const { id } = req.params;

  const result = await BookModel.deleteBook({ id });

  if (result === false) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  return res.json({ message: "Libro eliminado" });
}

async function updatePrice(req, res) {
  // const result = validatePartialBook(req.body)
  const { id } = req.params;
  const { input } = req.body;

  try {
    const updatedBook = await BookModel.updatePrice({ id, input });
    return res.json(updatedBook);
  } catch (error) {
    console.error("Error al actualizar el precio del libro:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateStock(req, res) {
  const { id } = req.params;
  const { input } = req.body;

  try {
    const updatedBook = await BookModel.updateStock({ id, input });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error al crear la venta:", error);
    throw new Error("Error al crear la venta");
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
