import { Router } from 'express'

import { BookController } from '../controllers/books.js'

export const booksRouter = Router()

booksRouter.get('/', BookController.getAll)
booksRouter.post('/', BookController.create)

booksRouter.get('/:id', BookController.getById)
booksRouter.delete('/:id', BookController.delete)
booksRouter.patch('/:id', BookController.update)