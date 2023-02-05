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
exports.Controller = void 0;
const repository_1 = require("./repository");
class Controller {
    constructor(model, db, validator, struct) {
        this.repo = new repository_1.Repository(model, db, struct);
        this.validator = validator;
    }
    getCount(authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.getCount(validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.count = 0;
                    return { resp };
                }
            }
            else {
                return yield this.repo.getCount();
            }
        });
    }
    getById(id, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.getById(id, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = null;
                    return { resp };
                }
            }
            else {
                return yield this.repo.getById(id);
            }
        });
    }
    get(authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.get(req, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = undefined;
                    return { resp };
                }
            }
            else {
                return yield this.repo.get(req);
            }
        });
    }
    create(data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.create(data, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = undefined;
                    return { resp };
                }
            }
            else {
                return yield this.repo.create(data);
            }
        });
    }
    createMultiple(data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.createMultiple(data, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.createMultiple(data);
            }
        });
    }
    update(data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.update(data, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.update(data);
            }
        });
    }
    updateMultiple(data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.updateMultiple(data, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.updateMultiple(data);
            }
        });
    }
    delete(id, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.delete(id, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.delete(id);
            }
        });
    }
    deleteMultiple(id, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.deleteMultiple(id, validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.delete(id);
            }
        });
    }
    getKeyValuePairs(authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    return yield this.repo.getKeyValuePairs(validate.id);
                }
                else {
                    let resp = {};
                    resp.code = 401;
                    resp.message = "Unauthorized";
                    resp.data = [];
                    return { resp };
                }
            }
            else {
                return yield this.repo.getKeyValuePairs();
            }
        });
    }
}
exports.Controller = Controller;
