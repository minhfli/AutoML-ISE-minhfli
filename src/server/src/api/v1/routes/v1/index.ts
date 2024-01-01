import {Router} from 'express'
import authRouter from "./auth";


const routeV1: Router = Router()

routeV1.use('/auth', authRouter)

export default routeV1
