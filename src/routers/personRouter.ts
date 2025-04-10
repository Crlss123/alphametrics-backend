import { Router } from "express";
import {
  getAllPeople,
  modifyPerson,
  createPerson,
  getPersonById,
  deletePerson,
  getTotalPeople,
  getStatusPercentage,
  getGenderStats,
} from "../controllers/personController";

const personRouter: Router = Router();

personRouter.get("/", getAllPeople);

personRouter.get("/gettotal", getTotalPeople);

personRouter.get("/getstatuspercentage", getStatusPercentage);

personRouter.get("/getgenderstats", getGenderStats);

personRouter.post("/", createPerson);

personRouter.patch("/:id", modifyPerson);

personRouter.delete("/:id", deletePerson);

personRouter.get("/:id", getPersonById);

export default personRouter;
