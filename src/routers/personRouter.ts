import { Router } from "express";
import { getAllPeople, modifyPerson } from "../controllers/personController";
const personRouter: Router = Router();

personRouter.get("/", getAllPeople);

personRouter.post("/", () => {});

personRouter.patch("/:id", modifyPerson);

personRouter.delete("/:id", () => {});

personRouter.get("/:id", () => {});

export default personRouter;
