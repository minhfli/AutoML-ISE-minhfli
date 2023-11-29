"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const storage_1 = require("@google-cloud/storage");
const config_1 = __importDefault(require("./src/config/config"));
const client_1 = require("@prisma/client");
const morgan_1 = __importDefault(require("morgan"));
const credential_path = "src/config/service-account-gcs.json";
const storage = new storage_1.Storage({ keyFilename: credential_path });
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [buckets] = yield storage.getBuckets();
        for (const bucket of buckets) {
            const [metadata] = yield bucket.getMetadata();
            console.log(JSON.stringify(metadata, null, 2));
            console.log(bucket.name);
        }
    });
}
main().catch(console.error);
const app = (0, express_1.default)();
// allow all cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:${config.frontendPort}"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:${config.frontendPort}',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '30mb' }));
app.use((0, express_fileupload_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(config_1.default.port, () => {
    console.log(`Server start on port ${config_1.default.port}`);
});
console.log(config_1.default.frontendPort);
