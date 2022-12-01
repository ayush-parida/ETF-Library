import { Logger } from "./logger";
interface BaseModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  version?: number;
}
export class Repository {
  logger: Logger;
  repo: any;

  constructor(model: any, db: any) {
    this.repo = db.sequelize.getRepository(model);
    this.logger = new Logger();
  }

  async get() {
    try {
      console.log(this.repo);
      const data = await this.repo.findAll();
      this.logger.info("Data:::", data);
      return data;
    } catch (err) {
      this.logger.error("Error::" + err);
      return [];
    }
  }

  async create(req: BaseModel) {
    let data = {};
    try {
      req.createdAt = new Date().toISOString();
      data = await this.repo.create(req);
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }

  async update(req: BaseModel) {
    let data = {};
    try {
      req.updatedAt = new Date().toISOString();
      data = await this.repo.update(
        { ...req },
        {
          where: {
            id: req.id,
          },
        }
      );
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }

  async delete(reqId: number) {
    let data = {};
    try {
      data = await this.repo.destroy({
        where: {
          id: reqId,
        },
      });
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }
}
