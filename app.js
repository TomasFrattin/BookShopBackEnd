import express from "express";
import { booksRouter } from "./routes/books.js";
import { usersRouter } from "./routes/users.js";
import { salesRouter } from "./routes/sales.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/sales", salesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
