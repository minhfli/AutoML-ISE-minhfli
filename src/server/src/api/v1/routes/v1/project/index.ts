import { Router } from "express";
import { ProjectController } from "../../../controllers/project";

const projectRouter = Router();

projectRouter.use("/createProject", ProjectController.createProject);
projectRouter.use("/upload/infoProject", ProjectController.infoProject);

export default projectRouter;
