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
  getPeopleByGroup,
  getAlertLevel,
  getAllZones,
  getPopulations,
  getAllPopulations,
} from "../controllers/personController";

const personRouter: Router = Router();

personRouter.get("/", getAllPeople);

personRouter.get("/gettotal", getTotalPeople);

personRouter.get("/getstatuspercentage", getStatusPercentage);

personRouter.get("/getgenderstats", getGenderStats);

personRouter.get("/getpeoplebygroup", getPeopleByGroup);

personRouter.get("/getalertlevel", getAlertLevel);

personRouter.get("/getallzones", getAllZones);

personRouter.get("/getpopulations", getPopulations);

personRouter.get("/getallpopulations", getAllPopulations)

personRouter.post("/", createPerson);

personRouter.patch("/:id", modifyPerson);

personRouter.delete("/:id", deletePerson);

personRouter.get("/:id", getPersonById);

export default personRouter;
