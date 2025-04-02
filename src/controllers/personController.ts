import { Request, Response, RequestHandler } from "express";
import { Person } from "../models/person";
import { Zone } from "../models/zone";

export const createPerson: RequestHandler = (req:Request, res:Response) => {
    if(!req.body){
        res.status(400).json({
            status: "error",
            message:"Content can not be empty",
            payload: null,
        });
    }

    const person = { ...req.body};
    Person.create(person)
    .then((data:Person | null)=> {
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: data,
        });
    })
    .catch((err)=>{
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product" + err.message,
            payload: null,
        });
    });
};

export const deletePerson: RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        await Person.destroy({ where: {id}});
        res.status(200).json({message: "Provided deleted"});
    } catch (error){
        res.status(500).json({
            message: "Error deleting products."
        });
    }
};
