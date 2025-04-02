import { Router } from "express";
import {
  getAllPeople,
  modifyPerson,
  createPerson,
  getPersonById,
  deletePerson,
} from "../controllers/personController";

const personRouter: Router = Router();

personRouter.get("/", getAllPeople);

personRouter.post("/", createPerson);

personRouter.patch("/:id", modifyPerson);

personRouter.delete("/:id", deletePerson);

personRouter.get("/:id", getPersonById);

export default personRouter;
