"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, secretSignature, tokenLife) => new Promise((resolve, reject) => {
    const { _id, role } = user;
    jsonwebtoken_1.default.sign({ _id, role }, secretSignature, { expiresIn: tokenLife }, (error, token) => {
        if (error) {
            return reject(error);
        }
        resolve(token);
    });
});
exports.generateToken = generateToken;
const verifyToken = (token, secretSignature, options) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, secretSignature, options, (error, decoded) => {
        if (error) {
            return reject(error);
        }
        return resolve(decoded);
    });
});
exports.verifyToken = verifyToken;
