import express, { Request, Response } from "express";
const morgan = require("morgan");
const PORT = 3000;
const app = express();
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});
