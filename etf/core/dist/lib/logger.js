"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pine = require("pine");
const logger = pine();
class Logger {
    info(message, data) {
        logger.info(`${message}  ${undefined != data ? JSON.stringify(data) : ""}`);
    }
    error(message) {
        logger.error(message);
    }
}
exports.Logger = Logger;
