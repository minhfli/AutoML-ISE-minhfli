import {Router} from 'express';
import {UserController} from "../../../controllers/user";

const register = Router();

register.post('/', UserController.createUser);

export default register;
