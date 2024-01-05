import dotenv from 'dotenv';
dotenv.config();


const backendURL = process.env.BACKEND_URL
const config = {
    backendURL
}
export default config;