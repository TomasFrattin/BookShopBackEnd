import { BookModel } from '../models/mysql/book.js'
import { validateBook, validatePartialBook } from '../schemas/books.js'

export class BookController {
  static async getAll (req, res) {
    const { genre } = req.query
    const books = await BookModel.getAll({ genre })
    res.json(books)
  }

  static async getById (req, res) {
    const { id } = req.params
    const book = await BookModel.getById({ id })
    if (book) return res.json(book)
    res.status(404).json({ message: 'Libro no encontrado' })
  }

  static async create (req, res) {
    const result = validateBook(req.body)

    if (!result.success) {
      
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newBook = await BookModel.create({ input: result.data })

    res.status(201).json(newBook)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await BookModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }

    return res.json({ message: 'Libro eliminado' })
  }

  static async update (req, res) {
    const result = validatePartialBook(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedBook = await BookModel.update({ id, input: result.data })

    return res.json(updatedBook)
  }
}