import express, { Request, Response } from "express";
const morgan = require("morgan");
const PORT = 3000;
const app = express();
app.use(morgan("dev"));

app.get("/evaluado/getevaluados", (req: Request, res: Response) => {
  res.send("Devuelve todos los evaluados");
});

app.post("/evaluado/createevaluado", (req: Request, res: Response) => {
  const id = req.body.id;
  res.send(`Crea un nuevo evaluado con el id ${id}`);
});

app.patch("/evaluado/patchevaluado/:id", (req: Request, res: Response) => {
  res.send(
    `Actualiza estas propiedades del evaluado con el id ${req.params.id}: status: ${req.body.status}, nombre: ${req.body.nombre}`
  );
});

app.listen(PORT, () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});
