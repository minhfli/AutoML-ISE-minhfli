import jwt from 'jsonwebtoken'
import { User } from '../models'

type TokenPayLoad = {
    id: string;
    name: string;
    email: string;
}

const genarateToken = (user: User, secretSignature: string, tokenLife: number): Promise<string> =>
    new Promise((resolve, reject) => {
        const { id, name, email } = user;
        const payload: TokenPayLoad = { id, name, email };
        const options = { expiresIn: tokenLife };

        jwt.sign(payload, secretSignature, options, (error, token) => {
            if (error) {
                return reject(error);
            }
            if (typeof token === 'string') {
                resolve(token);
            } else {
                reject(new Error('Unexpected type of token.'));
            }
        });
    });

const verifyToken = (token: string, secretSignature: string) : Promise<TokenPayLoad> =>
    new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded as TokenPayLoad);
        });
    })

export {genarateToken, verifyToken}