import { Project, Task } from "../models";
import { db } from "../db";

export type ProjectRequest = {
    name: string;
    task: string;
    modelsSearch: string;
};

const convertStringTask = (task: string): Task => {
    switch (task) {
        case 'Image Classification':
            return Task.IMAGE_CLASSIFICATION;
        case 'Object Detection':
            return Task.OBJECT_DETECTION;
        case 'Tabular Classification':
            return Task.TABULAR_CLASSIFICATION;
        case 'Text Classification':
            return Task.TEXT_CLASSIFICATION;
        default:
            throw new Error(`Invalid task string: ${task}`);
    }
};

const createProject = async (req: ProjectRequest): Promise<Boolean> => {
    let { name, task, modelsSearch } = req;
    try {
        const project = new Project();
        project.name = name;
        project.task = convertStringTask(task);
        project.description = modelsSearch;
        await db.getRepository(Project).save(project);
    } catch (error: any) {
        console.log(error);
        return false;
    }
    return true;
}

export const ProjectServices = {
    createProject
}