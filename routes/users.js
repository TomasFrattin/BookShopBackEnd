import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const usersRouter = Router();

usersRouter.post("/", UserController.createUser);
usersRouter.get("/", UserController.getAllUsers);

usersRouter.get("/:name", UserController.getUserByName);
usersRouter.patch("/change-password", UserController.changePassword);
usersRouter.delete("/:id", UserController.deleteUser);

usersRouter.post("/login", UserController.loginUser);
