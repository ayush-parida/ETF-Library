"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swagger = void 0;
const fs = require("fs");
class Swagger {
    constructor() {
        this.swaggerFile = process.cwd() + "/swagger/swagger.json";
        this.swaggerData = fs.readFileSync(this.swaggerFile, "utf8");
        this.customCss = fs.readFileSync(process.cwd() + "/swagger/swagger.css", "utf8");
        this.swaggerDocument = JSON.parse(this.swaggerData);
    }
}
exports.Swagger = Swagger;
