"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const multer_1 = __importDefault(require("multer"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./src/api/v1/db");
const config_1 = __importDefault(require("./src/config"));
const v1_1 = __importDefault(require("./src/api/v1/routes/v1"));
const app = (0, express_1.default)();
const apiPrefix = '/api/v1';
db_1.db.initialize().then(() => {
    console.log("Database initialized");
}).catch((err) => {
    console.log("Error initializing database", err);
});
app.use((0, cors_1.default)({
    origin: config_1.default.frontendURL,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '100mb' }));
app.use((0, multer_1.default)().any());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
app.use(apiPrefix, v1_1.default);
app.listen(config_1.default.port, () => {
    console.log("Server is running on port " + config_1.default.port);
});
//# sourceMappingURL=index.js.map