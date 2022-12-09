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
exports.Service = void 0;
const repository_1 = require("./repository");
class Service {
    constructor(model, db, validator) {
        this.repo = new repository_1.Repository(model, db);
        this.validator = validator;
    }
    get(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.get(req.query, id);
        });
    }
    getById(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getById(reqId, id);
        });
    }
    create(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.create(req, id);
        });
    }
    update(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.update(req, id);
        });
    }
    delete(reqId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.delete(reqId, id);
        });
    }
}
exports.Service = Service;
