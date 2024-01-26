import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3456;
const mongoURL = process.env.DATABASE_URL || "mongodb://localhost:27017";
const postgresURL = process.env.POSTGRES_URL || "postgres://postgres:postgres@localhost:5432/postgres";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3001";
const mlURL = process.env.ML_URL || "http://localhost:3333"
const gcpCredentials = process.env.GCP_CREDENTIALS || "service-account-gcs.json"
const accessTokenRequest = process.env.ACCESS_TOKEN_SECRET || ""

const config = {
    port,
    mongoURL,
    postgresURL,
    frontendURL,
    mlURL,
    gcpCredentials,
    accessTokenRequest,
};
console.log(config)
export default config