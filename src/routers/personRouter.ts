import { Router } from "express";
import { getAllPeople } from "../controllers/personController";
const personRouter: Router = Router();

  personRouter.get("/",getAllPeople);

personRouter.post("/",()=>{});

personRouter.patch("/:id",()=>{});

personRouter.delete("/:id",()=>{});

personRouter.get("/:id",()=>{});

export default personRouter;
