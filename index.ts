import express, { Request, Response } from "express";
import apiRouter from "./src/routers/apiRouter";
import connectionDB from "./src/connection/connection";
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(apiRouter);

connectionDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
