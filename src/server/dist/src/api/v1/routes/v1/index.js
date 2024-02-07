"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const project_1 = __importDefault(require("./project"));
const run_1 = __importDefault(require("./run"));
const routeV1 = (0, express_1.Router)();
routeV1.use('/auth', auth_1.default);
routeV1.use('/projects', project_1.default);
routeV1.use('/runs', run_1.default);
exports.default = routeV1;
//# sourceMappingURL=index.js.map