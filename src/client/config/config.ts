import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';
dotenv.config();



const backendURL = process.env.BACKEND_URL || 'http://localhost:3000';
const gcpCredentials = process.env.GCP_CREDENTIALS || "../service-account-gcs.json"
const accessTokenSecret = process.env.REFRESH_TOKEN_SECRET || "meowwwww"
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "linhxinhgai"
const nextApiUrl = process.env.NEXT_APP_API_URL || "http://localhost:3000/api"
const config = {
    backendURL,
    accessTokenSecret,
    gcpCredentials,
    refreshTokenSecret,
    nextApiUrl
}
export const storage = new Storage({
    keyFilename: config.gcpCredentials
});
export default config;