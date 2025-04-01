import { Router } from "express";
const personRouter: Router = Router();

personRouter.get("/",()=>{});

personRouter.post("/",()=>{});

personRouter.patch("/:id",()=>{});

personRouter.delete("/:id",()=>{});

personRouter.get("/:id",()=>{});

export default personRouter;
