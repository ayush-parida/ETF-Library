"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const controller_1 = require("./controller");
class Api {
    constructor(model, db, validator) {
        this.express = express();
        this.router = this.express;
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.controller = new controller_1.Controller(model, db, validator);
    }
    routes(authentication, isActive) {
        if (isActive.get)
            this.router.get(this.baseController, (req, res) => {
                this.controller
                    .get(this.info, authentication.get, req)
                    .then((data) => res.json(data));
            });
        if (isActive.getId)
            this.router.get(this.baseController + "/:id", (req, res) => {
                this.controller
                    .getById(this.info, parseInt(req.params.id), authentication.getId, req)
                    .then((data) => res.json(data));
            });
        if (isActive.post)
            this.router.post(this.baseController, (req, res) => {
                this.controller
                    .create(this.info, req.body, authentication.post, req)
                    .then((data) => res.json(data));
            });
        if (isActive.put)
            this.router.put(this.baseController, (req, res) => {
                this.controller
                    .update(this.info, req.body, authentication.put, req)
                    .then((data) => res.json(data));
            });
        if (isActive.delete)
            this.router.delete(this.baseController + "/:id", (req, res) => {
                this.controller
                    .delete(this.info, parseInt(req.params.id), authentication.delete, req)
                    .then((data) => res.json(data));
            });
    }
}
exports.Api = Api;
