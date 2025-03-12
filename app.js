import express from "express";
import { booksRouter } from "./routes/books.js";
import { usersRouter } from "./routes/users.js";
import { salesRouter } from "./routes/sales.js";
import { corsMiddleware } from "./middleware/cors.js";

import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(corsMiddleware());
app.use(express.json());
app.disable("x-powered-by");

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/sales", salesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, async () => {
  console.log(`Servidor iniciando en http://localhost:${PORT}`);
  await new Promise((resolve) => setTimeout(resolve, 3000)); 
  console.log("Servidor listo para recibir solicitudes");
});

