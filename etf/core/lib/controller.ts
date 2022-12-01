import { Logger } from "./logger";
import { Service } from "./service";

export class Controller {
  private service: Service;
  private logger: Logger;
  validator: any;

  constructor(model: any, db: any, validator: any) {
    this.service = new Service(model, db, validator);
    this.logger = new Logger();
    this.validator = validator;
  }

  async get(info: string, authentication: boolean, req: any) {
    if (authentication) {
      if (this.validator.isValid(req)) {
        this.logger.info(info, {});
        return await this.service.get();
      } else {
        return { error: ["Unauthorized"] };
      }
    } else {
      this.logger.info(info, {});
      return await this.service.get();
    }
  }

  async create(info: string, data: object, authentication: boolean, req: any) {
    if (authentication) {
      if (this.validator.isValid(req)) {
        this.logger.info(info, data);
        return await this.service.create(data);
      } else {
        return { error: ["Unauthorized"] };
      }
    } else {
      this.logger.info(info, data);
      return await this.service.create(data);
    }
  }

  async update(info: string, data: object, authentication: boolean, req: any) {
    if (authentication) {
      if (this.validator.isValid(req)) {
        this.logger.info(info, data);
        return await this.service.update(data);
      } else {
        return { error: ["Unauthorized"] };
      }
    } else {
      this.logger.info(info, data);
      return await this.service.update(data);
    }
  }

  async delete(info: string, id: number, authentication: boolean, req: any) {
    if (authentication) {
      if (this.validator.isValid(req)) {
        this.logger.info(info, { id });
        return await this.service.update({ id });
      } else {
        return { error: ["Unauthorized"] };
      }
    } else {
      this.logger.info(info, { id });
    }
  }
}
