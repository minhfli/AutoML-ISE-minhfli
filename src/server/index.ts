import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {Storage} from '@google-cloud/storage'
import config from './src/config/config'
import { PrismaClient } from '@prisma/client'
const credential_path: string    = "src/config/service-account-gcs.json"

const storage : Storage = new Storage({keyFilename: credential_path})

const prisma = new PrismaClient()

async function main() {
    const [buckets] = await storage.getBuckets()
    for (const bucket of buckets) {
        const [metadata] = await bucket.getMetadata();
        console.log(JSON.stringify(metadata, null, 2));
        console.log(bucket.name)
    }

}
main().catch(console.error)

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(config.port, () => {
    console.log(`Server start on port ${config.port}`);
})
