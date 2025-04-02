"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./controllers/user.controller");
const usersRouter = express_1.default.Router();
usersRouter.get("/users", user_controller_1.getAllUsers);
usersRouter.post("/register/admin", user_controller_1.createAdmin);
usersRouter.post("/register", user_controller_1.createUser);
usersRouter.post("/login", user_controller_1.logInUser);
exports.default = usersRouter;
