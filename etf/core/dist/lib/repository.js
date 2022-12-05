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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const logger_1 = require("./logger");
class Repository {
    constructor(model, db) {
        this.repo = db.sequelize.getRepository(model);
        this.logger = new logger_1.Logger();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.repo);
                const data = yield this.repo.findAll();
                this.logger.info("Data:::", data);
                return data;
            }
            catch (err) {
                this.logger.error("Error::" + err);
                return [];
            }
        });
    }
    getById(reqId) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield this.repo.findOne({
                    where: {
                        id: reqId,
                    },
                });
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                req.createdAt = new Date().toISOString();
                data = yield this.repo.create(req);
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                req.updatedAt = new Date().toISOString();
                data = yield this.repo.update(Object.assign({}, req), {
                    where: {
                        id: req.id,
                    },
                });
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
    delete(reqId) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield this.repo.destroy({
                    where: {
                        id: reqId,
                    },
                });
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
}
exports.Repository = Repository;
