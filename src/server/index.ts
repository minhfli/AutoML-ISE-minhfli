import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import multer from "multer";
import morgan from "morgan";
import routes from "./src/api/v1/routes/index"
import {db} from "./src/api/v1/db";
import config from "./src/config";
const app = express()

db.initialize().then(
    () => {
        console.log("Database initialized");
    }
).catch((err: any) => {
    console.log("Error initializing database", err);
});

// allow front end to access
app.use(cors(
    {
        origin: `http://localhost:${config.frontendURL}`,
        credentials: true
    }
))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `http://localhost:${config.frontendURL}`); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}))
app.use(multer().array('files'))
app.use(morgan('tiny'))
app.use(routes)


app.use(express.static('public'))
app.use((err: { status: any; message: any }, req: any, res: {
    json: (arg0: { status: any; message: any }) => void
}, next: any) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    })
})

app.post('/', (req, res) => {
    res.send('Hello World!');
    res.status(200);
})