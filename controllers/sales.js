import { SaleModel } from "../models/mysql/sale.js";

async function getAll(req, res) {
  try {
    const sales = await SaleModel.getAll();
    res.json(sales);
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
}

async function createSale(req, res) {
  try {
    const input = req.body;
    const result = await SaleModel.createSale({ input });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el controlador:", error);

    // Verifica si el error tiene un status personalizado
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: "Error interno al procesar la venta" });
  }
}



export const SaleController = {
  getAll,
  createSale,
};
