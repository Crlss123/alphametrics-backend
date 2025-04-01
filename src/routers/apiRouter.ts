import { Router,Request,Response } from "express";
import personRouter from "./personRouter";
const apiRouter: Router = Router();

apiRouter.use("/person",personRouter);

apiRouter.get("/",(req:Request,res:Response)=>{
    res.send("API root");
});

export default apiRouter;
