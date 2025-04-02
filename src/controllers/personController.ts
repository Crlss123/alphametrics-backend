import { Request, Response, RequestHandler } from "express";
import { Person } from "../models/person";
import { Population } from "../models/population";
import { Zone } from "../models/zone";

export const getAllPeople: RequestHandler = (req: Request, res: Response) => {
  Person.findAll({
    include: [
      {
        model: Population,
        include: [
          {
            model: Zone,
          },
        ],
      },
    ],
  })
    .then((data: Person[]) => {
      return res.status(200).json({
        message: "Personas obtenidas correctamente",
        payload: data,
        status: "success",
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        message: "Error al obtener las personas",
        payload: null,
        status: "error",
      });
    });
};
