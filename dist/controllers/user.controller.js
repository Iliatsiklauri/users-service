"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.createAdmin = createAdmin;
exports.createUser = createUser;
exports.logInUser = logInUser;
const User_service_1 = require("../services/User.service");
const validation_1 = require("../utils/validation");
const usersService = new User_service_1.UserService();
async function getAllUsers(req, res) {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    }
    catch (er) {
        console.log(er);
        return;
    }
}
async function createAdmin(req, res) {
    try {
        const { error } = validation_1.UserSchema.validate(req.body);
        if (error) {
            res
                .status(400)
                .json(error.details.map((error) => error.message.replace(/\n/g, " ").replace(/"/g, "")));
            return;
        }
        const admin = await usersService.createAdmin(req.body.email, req.body.password);
        if (!admin) {
            res.json("User with this email already Exists");
            return;
        }
        res.json("admin created successfully");
    }
    catch (er) {
        console.log(er);
        return;
    }
}
async function createUser(req, res) {
    const { error } = validation_1.UserSchema.validate(req.body);
    if (error) {
        res
            .status(400)
            .json(error.details.map((error) => error.message.replace(/\n/g, " ").replace(/"/g, "")));
        return;
    }
    const user = await usersService.createUser(req.body.email, req.body.password);
    if (!user) {
        res.json("User with this email already Exists");
        return;
    }
    res.json("user created successfully");
    try {
    }
    catch (er) {
        console.log(er);
        return;
    }
}
async function logInUser(req, res) {
    try {
        const { error } = validation_1.UserSchema.validate(req.body);
        if (error) {
            res
                .status(400)
                .json(error.details.map((error) => error.message.replace(/\n/g, " ").replace(/"/g, "")));
            return;
        }
        const token = await usersService.logInUser(req.body.email, req.body.password);
        if (!token) {
            res.json({ message: "invalid creditentials" });
            return;
        }
        res.json({ token });
    }
    catch (er) {
        console.log(er);
        return;
    }
}
