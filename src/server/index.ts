import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import createError from 'http-errors'
import fileupload, {UploadedFile} from 'express-fileupload'
import { Storage } from '@google-cloud/storage'
import config from './src/config/config'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { Upload } from '@google-cloud/storage/build/cjs/src/resumable-upload'
const credential_path: string = "src/config/service-account-gcs.json"
const storage: Storage = new Storage({ keyFilename: credential_path })

const prisma = new PrismaClient()
import fileUpload from 'express-fileupload'

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

// allow all cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:${config.frontendPort}"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(cors(
    {
        origin: 'http://localhost:${config.frontendPort}',
        credentials: true
    }
))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(fileupload())

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/upload', function(req, res) {
    let sampleFile : any;
    let uploadPath : any;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/public/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err : any) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

app.listen(config.port, () => {
    console.log(`Server start on port ${config.port}`);
})
console.log(config.frontendPort)
