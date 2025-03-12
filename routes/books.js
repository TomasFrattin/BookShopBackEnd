import { Router } from 'express';
import { BookController } from '../controllers/books.js';
import { verifyToken } from '../middleware/auth.js';

export const booksRouter = Router();

booksRouter.get('/', BookController.getAll);
booksRouter.post('/', verifyToken, BookController.create);

booksRouter.get('/:id', BookController.getById);
booksRouter.patch('/:id/updatePrice', verifyToken, BookController.updatePrice);
booksRouter.patch('/:id/updateStock', verifyToken, BookController.updateStock);
booksRouter.delete('/:id', verifyToken, BookController.deleteBook);
