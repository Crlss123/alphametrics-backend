"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personRouter_1 = __importDefault(require("./personRouter"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/person", personRouter_1.default);
apiRouter.get("/", (req, res) => {
    res.send("API root");
});
exports.default = apiRouter;
