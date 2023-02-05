"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const controller_1 = require("./controller");
class Api {
    constructor(model, db, validator, struct) {
        this.baseController = "";
        this.express = express();
        this.router = this.express;
        this.controller = new controller_1.Controller(model, db, validator, struct);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes(authentication, isActive) {
        // Count of objects in collection
        if (isActive.count) {
            this.router.get(this.baseController + "/count", (req, res) => {
                this.controller
                    .getCount(authentication.count, req)
                    .then((data) => res.json(data));
            });
        }
        // Get object by id or _id
        if (isActive.getId) {
            this.router.get(this.baseController + "/details/:id", (req, res) => {
                this.controller
                    .getById(req.params.id, authentication.getId, req)
                    .then((data) => res.json(data));
            });
        }
        // Get Colletion Entries wihch are is_active
        if (isActive.get) {
            this.router.get(this.baseController, (req, res) => {
                this.controller
                    .get(authentication.get, req)
                    .then((data) => res.json(data));
            });
        }
        // Create single object
        if (isActive.post) {
            this.router.post(this.baseController, (req, res) => {
                this.controller
                    .create(req.body, authentication.post, req)
                    .then((data) => res.json(data));
            });
        }
        // Create multiple objects
        if (isActive.multiPost) {
            this.router.post(this.baseController + "/multiple", (req, res) => {
                this.controller
                    .createMultiple(req.body, authentication.post, req)
                    .then((data) => res.json(data));
            });
        }
        // Update single object
        if (isActive.put) {
            this.router.put(this.baseController, (req, res) => {
                this.controller
                    .update(req.body, authentication.put, req)
                    .then((data) => res.json(data));
            });
        }
        // Update multiple objects at once
        if (isActive.multiPut) {
            this.router.put(this.baseController + "/multiple", (req, res) => {
                this.controller
                    .updateMultiple(req.body, authentication.put, req)
                    .then((data) => res.json(data));
            });
        }
        // Delete single object (set is_active=false)
        if (isActive.delete) {
            this.router.delete(this.baseController + "/:id", (req, res) => {
                this.controller
                    .delete(parseInt(req.params.id), authentication.delete, req)
                    .then((data) => res.json(data));
            });
        }
        // Delete multiple objects at once
        if (isActive.multiDelete) {
            this.router.delete(this.baseController + "/multiple/:id", (req, res) => {
                this.controller
                    .deleteMultiple(parseInt(req.params.id), authentication.delete, req)
                    .then((data) => res.json(data));
            });
        }
        // Get Key Value Pairs
        if (isActive.shortListing) {
            this.router.get(this.baseController + "/short-listings", (req, res) => {
                this.controller
                    .getKeyValuePairs(authentication.shortListing, req)
                    .then((data) => {
                    res.json(data);
                });
            });
        }
    }
}
exports.Api = Api;
