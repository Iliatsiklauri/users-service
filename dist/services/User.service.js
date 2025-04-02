"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_connect_1 = require("../db/database-connect");
const User_1 = require("../db/models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.UsersRepository = database_connect_1.AppDataSource.getRepository(User_1.User);
    }
    async getAllUsers() {
        // return await this.UsersRepository.clear();
        return await this.UsersRepository.find();
    }
    async createAdmin(email, password) {
        const existingUser = await this.UsersRepository.findOneBy({ email });
        if (existingUser)
            return null;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const adminUser = this.UsersRepository.create({
            email,
            password: hashedPassword,
            role: "ADMIN",
        });
        return await this.UsersRepository.save(adminUser);
    }
    async createUser(email, password) {
        const existingUser = await this.UsersRepository.findOneBy({ email });
        if (existingUser)
            return null;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = this.UsersRepository.create({
            email,
            password: hashedPassword,
            role: "USER",
        });
        return await this.UsersRepository.save(user);
    }
    async logInUser(email, password) {
        const user = await this.UsersRepository.findOneBy({ email });
        if (!user)
            return null;
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword)
            return null;
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
}
exports.UserService = UserService;
