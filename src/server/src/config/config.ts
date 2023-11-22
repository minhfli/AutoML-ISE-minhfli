import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

const config = {
    port,
    databaseURL,
};

export default config;