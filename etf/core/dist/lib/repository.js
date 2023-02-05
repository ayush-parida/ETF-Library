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
class Repository {
    constructor(model, db, _struct) {
        this.includes = [];
        this.model_includes = [];
        this.struct = {};
        this.attributes = [];
        this.repo = db.sequelize.getRepository(model);
        this.struct = _struct;
        _struct.fields.forEach((element) => {
            if (element.belongsTo || element.hasMany) {
                let _module_includes = {};
                if (element.belongsTo) {
                    _module_includes.displayKey =
                        element.belongsToData.FOREIGN_COLUMN_NAME;
                    _module_includes.reference = element.COLUMN_NAME;
                    _module_includes.model = db.sequelize.getRepository(element.belongsToData.FOREIGN_MODEL);
                    this.includes.push(element.belongsToData.FOREIGN_MODEL);
                }
                if (element.hasMany) {
                    _module_includes.displayKey =
                        element.hasManyData.HAS_MANY_MODEL_PRIMARY_KEY;
                    _module_includes.reference = element.hasManyData.HAS_MANY_NAME;
                    _module_includes.model = db.sequelize.getRepository(element.hasManyData.HAS_MANY_MODEL);
                    this.includes.push(element.hasManyData.HAS_MANY_MODEL);
                }
                this.model_includes.push(_module_includes);
            }
        });
        this.attributes = _struct.keyValueAttribute;
    }
    getCount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data.count = yield this.repo.count({
                    where: {
                        is_active: true,
                    },
                });
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.count = 0;
            }
            finally {
                return data;
            }
        });
    }
    getById(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data.data = yield this.repo.findOne({
                    where: {
                        id: reqId,
                        is_active: true,
                    },
                });
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = null;
            }
            finally {
                return data;
            }
        });
    }
    get(params, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let out = {};
            try {
                let order = ["id", "ASC"];
                if (params.order_by) {
                    order[0] = params.order_by;
                }
                if (params.order_by && params.order) {
                    if (params.order == "ASC") {
                        order[1] = params.order;
                    }
                    if (params.order == "DESC") {
                        order[1] = params.order;
                    }
                }
                let obj = {
                    where: { is_active: true },
                    offset: 0,
                    limit: 10,
                    distinct: true,
                    include: this.includes,
                    order: [order],
                };
                if (!this.includes || !params.nested) {
                    delete obj.distinct;
                    delete obj.include;
                }
                if (params.page && params.page > 0) {
                    if (params.page_size) {
                        obj.offset = (parseInt(params.page) - 1) * parseInt(params.page_size);
                        obj.limit = parseInt(params.page_size);
                    }
                    else {
                        obj.offset = (parseInt(params.page) - 1) * 10;
                        obj.limit = 10;
                    }
                }
                if (params.page == 0) {
                    delete obj.limit;
                }
                let nested = [];
                Object.keys(this.repo.associations).forEach((element) => {
                    if (this.includes && params.nested == 1) {
                        this.model_includes.forEach((element2) => {
                            if (element == element2.reference) {
                                let _keys = [];
                                Object.keys(element2.model.getAttributes()).forEach((k) => {
                                    let key = {};
                                    key.name = k;
                                    _keys.push(key);
                                });
                                let _nested = {
                                    keys: _keys,
                                    displayKey: element2.displayKey,
                                    nested: Object.keys(element2.model.associations),
                                    reference: element2.reference,
                                };
                                nested.push(_nested);
                            }
                        });
                    }
                });
                const data = yield this.repo.findAndCountAll(obj);
                let res = {
                    code: 200,
                    message: "Success",
                    data: {
                        rows: data.rows,
                        meta: {
                            columns: [],
                            pagination: {
                                page: obj.offset + 1,
                                pageSize: params.page == 0 ? "all" : obj.limit,
                                pageCount: params.page == 0
                                    ? 1
                                    : data.count % obj.limit
                                        ? parseInt((data.count / obj.limit).toString()) + 1
                                        : parseInt((data.count / obj.limit).toString(), 10),
                                total: data.count,
                            },
                            nested: nested,
                        },
                    },
                };
                out = res;
            }
            catch (err) {
                out.code = 500;
                out.message = err.message;
                out.data = undefined;
            }
            finally {
                return out;
            }
        });
    }
    create(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.created_by = id;
                }
                req.is_active = true;
                req.created_at = new Date().toISOString();
                data.data = yield this.repo.create(req);
                data.code = 201;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = null;
            }
            finally {
                return data;
            }
        });
    }
    createMultiple(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.created_by = id;
                }
                req.is_active = true;
                req.created_at = new Date().toISOString();
                data.data = yield this.repo.bulkCreate(req);
                data.code = 201;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            finally {
                return data;
            }
        });
    }
    update(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.created_by = id;
                }
                req.updated_at = new Date().toISOString();
                data.data = yield this.repo.update(Object.assign({}, req), {
                    where: {
                        id: req.id,
                    },
                });
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            finally {
                return data;
            }
        });
    }
    updateMultiple(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                if (id) {
                    req.created_by = id;
                }
                req.updated_at = new Date().toISOString();
                req.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    data.data.push(yield this.repo.update(Object.assign({}, element), {
                        where: {
                            id: req.id,
                        },
                    }));
                }));
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            finally {
                return data;
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
                let deleted_at = new Date().toISOString();
                data.data = yield this.repo.update(Object.assign({ is_active: false, deleted_at: deleted_at, deleted_by: _id }), {
                    where: {
                        id: reqId,
                    },
                });
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            return data;
        });
    }
    deleteMultiple(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                let _id = null;
                if (id) {
                    _id = id;
                }
                let deleted_at = new Date().toISOString();
                reqId.split(",").forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    data.data.push(yield this.repo.update(Object.assign({
                        is_active: false,
                        deleted_at: deleted_at,
                        deleted_by: _id,
                    }), {
                        where: {
                            id: element,
                        },
                    }));
                }));
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            return data;
        });
    }
    getKeyValuePairs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            try {
                data.data = yield this.repo.findAndCountAll({
                    attributes: this.attributes,
                    where: {
                        is_active: true,
                    },
                });
                data.code = 200;
                data.message = "Success";
            }
            catch (err) {
                data.code = 500;
                data.message = err.message;
                data.data = [];
            }
            finally {
                return data;
            }
        });
    }
}
exports.Repository = Repository;
