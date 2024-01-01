import {Router} from 'express';
import {UserController} from "../../../controllers/user";

const login = Router();

login.post("/", UserController.checkLogin)
export default login;
