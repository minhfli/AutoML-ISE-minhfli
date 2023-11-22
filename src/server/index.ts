import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './src/config/config'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))

app.listen(config.port, () => {
    console.log(`Server start on port ${config.port}`);
})
