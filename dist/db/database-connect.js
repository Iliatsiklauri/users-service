"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.dbConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbConfig = {
    host: "localhost",
    port: 5432,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
};
const dataSourceOptions = {
    type: "postgres",
    host: exports.dbConfig.host,
    port: exports.dbConfig.port,
    username: exports.dbConfig.user,
    password: exports.dbConfig.password,
    database: exports.dbConfig.name,
    entities: [`${__dirname}/models/*.{ts,js}`],
    synchronize: true,
};
exports.AppDataSource = new typeorm_1.DataSource(dataSourceOptions);
