"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import routeV1 from './v1/index.js'
const routes = (0, express_1.Router)();
// Heath check
routes.get('/api/healthz', (req, res) => {
    return res.json({ status: 'OK' });
});
// routes.use('/', routeV1)
exports.default = routes;
