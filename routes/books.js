import { Router } from 'express'
import { BookController } from '../controllers/books.js'

export const booksRouter = Router()

booksRouter.get('/', BookController.getAll)
booksRouter.post('/', BookController.create)

booksRouter.get('/:id', BookController.getById)
booksRouter.patch('/:id/updatePrice', BookController.updatePrice);
booksRouter.patch('/:id/updateStock', BookController.updateStock);
booksRouter.delete('/:id', BookController.delete)



