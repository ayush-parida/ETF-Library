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
    create(req: BaseModel): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    update(req: BaseModel): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    delete(reqId: number): Promise<{}>;
}
export {};
