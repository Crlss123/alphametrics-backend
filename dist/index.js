"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require("morgan");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(morgan("dev"));
app.listen(PORT, () => {
    console.log("El servidor esta corriendo en el puerto 3000");
});
