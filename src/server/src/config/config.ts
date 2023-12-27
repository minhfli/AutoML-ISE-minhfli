import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3456;
const mongoURL = process.env.DATABASE_URL || "mongodb://localhost:27017";
const postgresURL = process.env.POSTGRES_URL || "postgres://postgres:postgres@localhost:5432/postgres";
const frontendURL : any = "http://localhost:3001" || process.env.FRONTEND_URL ;
const config = {
    port,
    mongoURL,
    postgresURL,
    frontendURL
};

export default config;