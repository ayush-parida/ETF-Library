import { Logger } from "./logger";
interface BaseModel {
    id?: number;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    version?: number;
}
export declare class Repository {
    logger: Logger;
    repo: any;
    constructor(model: any, db: any);
    get(params: any, id: any): Promise<{
        response: any;
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: any;
            };
        };
    } | never[]>;
    getById(reqId: number, id: any): Promise<{}>;
    create(req: BaseModel, id: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    update(req: BaseModel, id: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    delete(reqId: number, id: any): Promise<{}>;
}
export {};
