import {Router} from "express";
import {ProjectController} from "../../../controllers/project";

const projectRouter = Router();

projectRouter.post("/projects", ProjectController.createProject);

projectRouter.get("/projects/:projectId", ProjectController.getProjectById);

projectRouter.post("/projects/train", ProjectController.trainProject);

projectRouter.post("/projects/predict", ProjectController.predictProject);

export default projectRouter;
