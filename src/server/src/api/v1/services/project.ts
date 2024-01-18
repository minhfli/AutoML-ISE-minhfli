import { Project, Task } from "../models";
import { db } from "../db";
import { User } from "../models";
import config from "../../../config";
import axios from "axios";

export type ProjectRequest = {
    email: string;
    name: string;
    task: string;
    modelsSearch: string;
    training_time: string;
};

export type ProjectInfoRequest = {
    user_name: string;
    project_name: string;
    // training_time: string;
    // task: string;
};

const convertStringTask = (task: string): Task => {
    switch (task) {
        case 'Image Classification':
            return Task.IMAGE_CLASSIFICATION;
        case 'Object Detection':
            return Task.OBJECT_DETECTION;
        case 'Tabular Data Classification (Multi-class)':
            return Task.TABULAR_CLASSIFICATION;
        case 'Text Classification':
            return Task.TEXT_CLASSIFICATION;
        case 'Text Generation':
            return Task.TEXT_GENERATION;
        case 'Question Answering':
            return Task.QUESTION_ANSWERING;
        case 'Summarization':
            return Task.SUMMARIZATION;
        case 'Tabular Data Regression':
            return Task.TABULAR_DATA_REGRESSION;
        case 'LLM Finetuning':
            return Task.LLM_FINETUNING;
        default:
            throw new Error(`Invalid task string: ${task}`);
    }
};

const createProject = async (req: ProjectRequest): Promise<Project | null> => {
    let { email, name, task, modelsSearch, training_time } = req;
    try {
        console.log("email when create project: " + email)
        const user = await db.getRepository(User).findOne({
            where: {
                email: email
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
        project.training_time = training_time;

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

const sendDataToMLService = async (req : ProjectInfoRequest) => {
    try {
        const response = await axios.post(`${config.mlURL}/api/image_classifier/train`, {
            username: req.user_name,
            project_name: req.project_name,
        });
        console.log("respone from ml here " + response.status);
        const result = response.data;

        return result;
    } catch (error) {
        console.error('Error communicating with ML service:', error);
        throw error;
    }
}

export const ProjectServices = {
    createProject,
    sendDataToMLService,
}