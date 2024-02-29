import { SaleModel } from "../models/mysql/sale.js";

export class SaleController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const sales = await SaleModel.getAll({ genre });
    res.json(sales);
  }

  static async createSale(req, res) {
    try {
      const input = req.body;
      const result = await SaleModel.createSale({ input });
      res.status(201).json(result);
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  }
}
