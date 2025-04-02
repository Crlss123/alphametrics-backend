import { Router } from "express";
import {
    createPerson,
    deletePerson
} from '../controllers/personController';

const personRouter: Router = Router();

personRouter.get("/",()=>{});

personRouter.post("/",createPerson);

personRouter.patch("/:id",()=>{});

personRouter.delete("/:id",deletePerson);

personRouter.get("/:id",()=>{});

export default personRouter;
