import { Router } from "express";
import createProject from "./createProject";

const projectRouter = Router();

projectRouter.use("/createProject", createProject);

export default projectRouter;
