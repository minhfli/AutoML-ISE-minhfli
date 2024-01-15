import { Project, Task } from "../models";
import { db } from "../db";
import { User } from "../models";

export type ProjectRequest = {
    email: string;
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

const createProject = async (req: ProjectRequest): Promise<Project | null> => {
    let { email, name, task, modelsSearch } = req;
    try {
        console.log("email when create project: " + email)
        const user = await db.getRepository(User).findOne({
            where: {
                email : email
            }
        });
        if (!user) {
            console.error('User not found');
            return null;
        }
        const project = new Project();
        project.name = name;
        project.task = convertStringTask(task);
        project.description = modelsSearch;
        project.user = user;

        user.projects = user.projects || [];
        user.projects.push(project);

        await db.getRepository(User).save(user);
        await db.getRepository(Project).save(project);

        return project;
    } catch (error: any) {
        console.log(error);
        return null;
    }

}

export const ProjectServices = {
    createProject
}