"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_connect_1 = require("./db/database-connect");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/Ads", routes_1.default);
database_connect_1.AppDataSource.initialize().then(async () => {
    console.log("connected to database");
});
app.listen(3000, () => {
    console.log("server started");
});
