import {Router} from 'express'
import authRouter from "./auth";
import projectRouter from './project';
import isAuth from '../../middlewares/auth';

const routeV1: Router = Router()

routeV1.use('/auth', authRouter)
routeV1.use('/', projectRouter)

export default routeV1
