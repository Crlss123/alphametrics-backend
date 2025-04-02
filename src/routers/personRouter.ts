import { Router } from "express";
import {
    createPerson
} from '../controllers/personController';

const personRouter: Router = Router();

personRouter.get("/",()=>{});

personRouter.post("/",createPerson);

personRouter.patch("/:id",()=>{});

personRouter.delete("/:id",()=>{});

personRouter.get("/:id",()=>{});

export default personRouter;
