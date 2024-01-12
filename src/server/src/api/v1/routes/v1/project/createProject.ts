import { Router } from "express";
import { ProjectController } from "../../../controllers/project";

const createProject = Router();

createProject.post("/", ProjectController.createProject);

export default createProject;