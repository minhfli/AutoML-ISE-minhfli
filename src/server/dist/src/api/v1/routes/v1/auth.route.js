"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = __importDefault(require("../../controllers/auth.controller.js"));
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_controller_js_1.default.Login);
authRouter.post('/signup', auth_controller_js_1.default.Signup);
exports.default = authRouter;
