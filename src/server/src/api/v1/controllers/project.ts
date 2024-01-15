import { Request, Response } from "express"
import { ProjectRequest, ProjectServices } from "../services/project"

const createProject = async (req: Request, res: Response) => {
    let { email, name, task, modelsSearch } = req.body as ProjectRequest;
    try {
        const project = await ProjectServices.createProject({ email, name, task, modelsSearch });
        console.log(project);
        if (project) {
            res.status(201).json({
                message: "Project created successfully",
                project_name: project.name,
                user_name: project.user.name,
            });
        } else {
            res.status(400).json({
                message: "Project could not be created, please check the provided data.",
            });
        }
    } catch (error: any) {
        console.error('Project creation failed:', error);
        res.status(500).json({
            message: "An unexpected error occurred.",
        });
    }
}

export const ProjectController = {
    createProject,
}