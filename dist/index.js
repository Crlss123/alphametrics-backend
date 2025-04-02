"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRouter_1 = __importDefault(require("./src/routers/apiRouter"));
const connection_1 = __importDefault(require("./src/connection/connection"));
const morgan = require("morgan");
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(morgan("dev"));
app.use(cors());
app.use(express_1.default.json());
app.use(apiRouter_1.default);
(0, connection_1.default)();
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
