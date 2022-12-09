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
    get(params, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let obj = {
                    offset: 0,
                    limit: 10,
                };
                if (params.page) {
                    if (params.page_size) {
                        obj.offset = (parseInt(params.page) - 1) * parseInt(params.page_size);
                        obj.limit = parseInt(params.page_size);
                    }
                    else {
                        obj.offset = (parseInt(params.page) - 1) * 10;
                        obj.limit = 10;
                    }
                }
                const data = yield this.repo.findAndCountAll(obj);
                this.logger.info("Data:::", data);
                let res = {
                    response: data.rows,
                    meta: {
                        pagination: {
                            page: obj.offset + 1,
                            pageSize: obj.limit,
                            pageCount: data.count % obj.limit
                                ? parseInt((data.count / obj.limit).toString()) + 1
                                : parseInt((data.count / obj.limit).toString(), 10),
                            total: data.count,
                        },
                    },
                };
                return res;
            }
            catch (err) {
                this.logger.error("Error::" + err);
                return [];
            }
        });
    }
    getById(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data = yield this.repo.findOne({
                    where: {
                        id: reqId,
                    },
                });
                return data;
            }
            catch (err) {
                this.logger.error("Error::" + err);
                return { err };
            }
        });
    }
    create(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.createdBy = id;
                }
                req.createdAt = new Date().toISOString();
                data = yield this.repo.create(req);
                return Object.assign(Object.assign({}, data), { response: "Success" });
            }
            catch (err) {
                this.logger.error("Error::" + err);
                return { err };
            }
        });
    }
    update(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.createdBy = id;
                }
                req.updatedAt = new Date().toISOString();
                data = yield this.repo.update(Object.assign({}, req), {
                    where: {
                        id: req.id,
                    },
                });
                return Object.assign(Object.assign({}, data), { response: "Success" });
            }
            catch (err) {
                this.logger.error("Error::" + err);
                return { err };
            }
        });
    }
    delete(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                let _id = null;
                if (id) {
                    _id = id;
                }
                let deletedAt = new Date().toISOString();
                data = yield this.repo.update(Object.assign({ is_active: false, deletedAt: deletedAt, deletedBy: _id }), {
                    where: {
                        id: reqId,
                    },
                });
                return Object.assign(Object.assign({}, data), { response: "Success" });
            }
            catch (err) {
                this.logger.error("Error::" + err);
            }
            return data;
        });
    }
}
exports.Repository = Repository;
