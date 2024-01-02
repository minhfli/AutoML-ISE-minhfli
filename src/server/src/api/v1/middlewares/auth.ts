import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import config from "../../../config";

interface AuthenticatedRequest extends Request {
  user?: TokenPayLoad;
}

export type TokenPayLoad = {
    id: string;
    name: string;
    email: string;
};

const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (accessToken) {
        try {
            const decoded = await verifyToken(accessToken, config.accessTokenRequest);
            req.user = decoded;
            next();
        } catch (error : any) {
            return res.status(401).json({error: error.message});
        }
    } else {
        return res.sendStatus(403);
    }
}

export default isAuth;