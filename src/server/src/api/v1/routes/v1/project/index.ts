import {Router} from "express";
import {ProjectController} from "../../../controllers/project";
import ImageClassification from "./ImageClassification";

const projectRouter = Router();

projectRouter.post("/projects", ProjectController.createProject);

projectRouter.get("/projects/:projectId", ProjectController.getProjectById);

projectRouter.use("/projects/ImageClassification", ImageClassification);

export default projectRouter;
