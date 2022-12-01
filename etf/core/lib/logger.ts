const pine = require("pine");
const logger = pine();
export class Logger {
  info(message: string, data: object) {
    logger.info(`${message}  ${undefined != data ? JSON.stringify(data) : ""}`);
  }
  error(message: string) {
    logger.error(message);
  }
}
