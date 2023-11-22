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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// @ts-ignore
const config_ts_1 = __importDefault(require("#src/config/config.ts"));
// @ts-ignore
const jwt_util_1 = require("#api/utils/jwt.util");
// @ts-ignore
const user_model_ts_1 = __importDefault(require("#api/models/user.model.ts"));
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_ts_1.default.findOne({ email });
        if (!user) {
            return res.sendStatus(401);
        }
        const passwordMatch = bcrypt_1.default.compareSync(password, user.password);
        if (passwordMatch) {
            const accessToken = yield (0, jwt_util_1.generateToken)({ _id: user._id }, config_ts_1.default.accessTokenSecret, '1d');
            const refreshToken = yield (0, jwt_util_1.generateToken)({ _id: user._id }, config_ts_1.default.refreshTokenSecret, '30d');
            yield updateRefreshToken(user._id, refreshToken);
            return res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
        }
        return res.status(401).json('Password incorrect');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = 10;
    try {
        const { name, email, password } = req.body;
        // // validate input
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() })
        // }
        const validInput = email && password && name;
        if (!validInput) {
            res.status(400).send('All input is required');
        }
        const oldUser = yield user_model_ts_1.default.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ error: 'User Already Exist. Please Login' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new user_model_ts_1.default({
            name: name,
            email: email,
            password: hashedPassword,
        });
        yield newUser.save();
        return res.status(200).json({ message: 'Account created successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromClient = req.headers['x-refresh-token'] || req.body.refreshToken;
    if (!refreshTokenFromClient) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const user = yield user_model_ts_1.default.findOne({ refresh_token: refreshTokenFromClient });
    if (!user) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
    try {
        jsonwebtoken_1.default.verify(refreshTokenFromClient, config_ts_1.default.refreshTokenSecret);
        const accessToken = yield (0, jwt_util_1.generateToken)({ _id: user._id }, config_ts_1.default.accessTokenSecret, '1h');
        return res.status(200).json({ access_token: accessToken });
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
});
const updateRefreshToken = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_ts_1.default.findByIdAndUpdate(id, { refresh_token: refreshToken }, { new: true });
    }
    catch (err) {
        console.log(err);
    }
});
const AuthController = {
    Login,
    Signup,
    RefreshToken,
};
exports.default = AuthController;
