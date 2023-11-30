import {verifyToken} from '../utils/jwt.util'
// TODO: Fix type with any
const isAuth = async (req: { cookies: { accessToken: any }; user: any }, res: {
    msg: any;
    status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: unknown }): any; new(): any } };
    sendStatus: (arg0: number) => any
}, next: () => void) => {
    const { accessToken } = req.cookies
    if (accessToken) {
        try {
            // @ts-ignore
            req.user = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET, {})
            next()
        } catch (error) {
            // @ts-ignore
            if (error.name === 'TokenExpiredError') {
                // @ts-ignore
                if (error.message === 'jwt expired') {
                    // @ts-ignore
                    res.msg = error.message
                    // @ts-ignore
                    req.user = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET, {
                        ignoreExpiration: true,
                    })
                    return next()
                }
            }

            return res.status(500).json({ error })
        }
    } else {
        return res.sendStatus(403)
    }
}

export default isAuth
