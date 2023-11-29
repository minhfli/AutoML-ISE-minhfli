"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.default = config;
