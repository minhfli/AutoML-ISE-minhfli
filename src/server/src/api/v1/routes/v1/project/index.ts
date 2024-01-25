import {Router} from "express";
import {ProjectController} from "../../../controllers/project";
import ImageClassification from "./ImageClassification";

const projectRouter = Router();

projectRouter.post("/projects/createProject", ProjectController.createProject);

projectRouter.post("/projects/getAllProject", ProjectController.getAllProject);

projectRouter.get("/projects/:projectId", ProjectController.getProjectById);

projectRouter.use("/projects/ImageClassification", ImageClassification);

export default projectRouter;
