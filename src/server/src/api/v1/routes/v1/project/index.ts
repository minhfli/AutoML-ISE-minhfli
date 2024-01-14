import { Router } from "express";
import { ProjectController } from "../../../controllers/project";

const projectRouter = Router();

projectRouter.use("/createProject", ProjectController.createProject);

export default projectRouter;
