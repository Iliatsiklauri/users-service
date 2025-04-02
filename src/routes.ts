import express from "express";
import {
  getAllUsers,
  createAdmin,
  createUser,
  logInUser,
} from "./controllers/user.controller";
const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);
usersRouter.post("/register/admin", createAdmin);
usersRouter.post("/register", createUser);
usersRouter.post("/login", logInUser);

export default usersRouter;
