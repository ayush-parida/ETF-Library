export declare class Controller {
    private service;
    private logger;
    validator: any;
    constructor(model: any, db: any, validator: any);
    get(info: string, authentication: boolean, req: any): Promise<any>;
    getById(info: string, id: number, authentication: boolean, req: any): Promise<{}>;
    create(info: string, data: object, authentication: boolean, req: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    } | {
        error: string[];
    }>;
    update(info: string, data: object, authentication: boolean, req: any): Promise<{
        response: string;
        err?: undefined;
    } | {
        err: unknown;
    } | {
        error: string[];
    }>;
    delete(info: string, id: number, authentication: boolean, req: any): Promise<{}>;
}
