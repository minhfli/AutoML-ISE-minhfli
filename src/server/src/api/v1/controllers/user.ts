import {UserRequest, UserServices} from "../services/user"; // Import the user services
import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import { genarateToken } from "../utils/jwt";
import config from "../../../config";

const createUser = async (req: Request, res: Response) => {
    try {
        let {username, email, password} = req.body as UserRequest;
        password = await bcrypt.hash(password, 10);
        const user = await UserServices.createUser({username, email, password});

        if (user === true) {
            res.status(201).json({
                message: "User created successfully",
            });
        } else {
            res.status(400).json({
                message: "User could not be created, please check the provided data.",
            });
        }
    } catch (error: any) {
        console.error('User creation failed:', error);
        res.status(500).json({
            message: "An unexpected error occurred.",
        });
    }
};

const checkLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body as UserRequest;
        const user = await UserServices.findByEmail(email);
        if (user === null) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = await genarateToken(user, config.accessTokenRequest, 600) // 10p
            res.status(200).json({
                message: "User logged in successfully",
                access_token: accessToken,
            });
        } else {
            res.status(401).json({
                message: "Incorrect password",
            });
        }
    } catch (error: any) {
        console.error('User login failed:', error);
        res.status(500).json({
            message: "An unexpected error occurred.",
        });
    }
}


export const UserController = {
    createUser,
    checkLogin
};
