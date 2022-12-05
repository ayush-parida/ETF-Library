export declare class Service {
    private repo;
    validator: any;
    constructor(model: any, db: any, validator: any);
    get(): Promise<any>;
    getById(reqId: number): Promise<{}>;
    create(req: object): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    update(req: object): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    }>;
    delete(reqId: number): Promise<{}>;
}
