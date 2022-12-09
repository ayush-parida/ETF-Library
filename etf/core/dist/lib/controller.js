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
const logger_1 = require("./logger");
const service_1 = require("./service");
class Controller {
    constructor(model, db, validator) {
        this.service = new service_1.Service(model, db, validator);
        this.logger = new logger_1.Logger();
        this.validator = validator;
    }
    get(info, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    this.logger.info(info, {});
                    return yield this.service.get(req, validate.id);
                }
                else {
                    return { error: ["Unauthorized"] };
                }
            }
            else {
                this.logger.info(info, {});
                return yield this.service.get(req);
            }
        });
    }
    getById(info, id, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    this.logger.info(info, { id });
                    return yield this.service.getById(id, validate.id);
                }
                else {
                    return { error: ["Unauthorized"] };
                }
            }
            else {
                this.logger.info(info, { id });
                return yield this.service.getById(id);
            }
        });
    }
    create(info, data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    this.logger.info(info, data);
                    return yield this.service.create(data, validate.id);
                }
                else {
                    return { error: ["Unauthorized"] };
                }
            }
            else {
                this.logger.info(info, data);
                return yield this.service.create(data);
            }
        });
    }
    update(info, data, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    this.logger.info(info, data);
                    return yield this.service.update(data, validate.id);
                }
                else {
                    return { error: ["Unauthorized"] };
                }
            }
            else {
                this.logger.info(info, data);
                return yield this.service.update(data);
            }
        });
    }
    delete(info, id, authentication, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authentication) {
                let validate = this.validator.isValid(req);
                if (validate.status) {
                    this.logger.info(info, { id });
                    return yield this.service.delete(id, validate.id);
                }
                else {
                    return { error: ["Unauthorized"] };
                }
            }
            else {
                this.logger.info(info, { id });
                return yield this.service.delete(id);
            }
        });
    }
}
exports.Controller = Controller;
