import { Router } from "express";
import { ProjectController } from "../../../controllers/project";

const projectRouter = Router();

projectRouter.use("/createProject", ProjectController.createProject);
projectRouter.use("/upload/trainProject", ProjectController.trainProject);
projectRouter.use("/predict", ProjectController.predictProject);

export default projectRouter;
