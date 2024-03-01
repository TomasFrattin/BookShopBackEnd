import { SaleModel } from "../models/mysql/sale.js";

async function getAll(req, res) {
  const sales = await SaleModel.getAll();
  res.json(sales);
}

async function createSale(req, res) {
  try {
    const input = req.body;
    const result = await SaleModel.createSale({ input });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}

export const SaleController = {
  getAll,
  createSale,
};
