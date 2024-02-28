import { Router } from 'express'
import { SaleController } from '../controllers/sales.js'

export const salesRouter = Router()

salesRouter.get('/', SaleController.getAll)
salesRouter.post('/', SaleController.createSale)




