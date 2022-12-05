import { Repository } from "./repository";
export class Service {
  private repo: Repository;
  validator: any;

  constructor(model: any, db: any, validator: any) {
    this.repo = new Repository(model, db);
    this.validator = validator;
  }

  async get() {
    return await this.repo.get();
  }

  async getById(reqId: number) {
    return await this.repo.getById(reqId);
  }

  async create(req: object) {
    return await this.repo.create(req);
  }

  async update(req: object) {
    return await this.repo.update(req);
  }

  async delete(reqId: number) {
    return await this.repo.delete(reqId);
  }
}
