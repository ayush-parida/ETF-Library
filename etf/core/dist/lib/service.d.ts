export declare class Service {
    private repo;
    validator: any;
    constructor(model: any, db: any, validator: any);
    get(req: any, id?: any): Promise<never[] | {
        response: any;
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: any;
            };
        };
    }>;
    getById(reqId: number, id?: any): Promise<{}>;
    create(req: object, id?: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    update(req: object, id?: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    delete(reqId: number, id?: any): Promise<{}>;
}
