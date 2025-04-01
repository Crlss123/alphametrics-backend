import { Request, Response, RequestHandler } from "express";
import { Person } from "../models/person";

export const createPerson: RequestHandler = async (req: Request, res: Response) => {

  if(!req.body){
    res.status(400).json({
      message: "No se recibieron datos",
      payload: null,
      status: "error",
    });
    return;
  }

};
