import { Router } from "express";
import { getAllPeople, modifyPerson,createPerson } from "../controllers/personController";

const personRouter: Router = Router();

personRouter.get("/", getAllPeople);

personRouter.post("/", createPerson);

personRouter.patch("/:id", modifyPerson);

personRouter.delete("/:id", () => {});

personRouter.get("/:id", () => {});

export default personRouter;
