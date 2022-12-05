import { Logger } from "./logger";
interface BaseModel {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    version?: number;
}
export declare class Repository {
    logger: Logger;
    repo: any;
    constructor(model: any, db: any);
    get(): Promise<any>;
    getById(reqId: number): Promise<{}>;
    create(req: BaseModel): Promise<{}>;
    update(req: BaseModel): Promise<{}>;
    delete(reqId: number): Promise<{}>;
}
export {};
