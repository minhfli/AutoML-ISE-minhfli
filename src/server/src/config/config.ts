import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const mongoURL = process.env.DATABASE_URL;
const postgresURL = process.env.POSTGRES_URL;
const frontendPort = process.env.FRONTEND_PORT;
const config = {
    port,
    mongoURL,
    postgresURL,
    frontendPort
};

export default config;