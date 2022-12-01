export declare class Controller {
    private service;
    private logger;
    validator: any;
    constructor(model: any, db: any, validator: any);
    get(info: string, authentication: boolean, req: any): Promise<any>;
    create(info: string, data: object, authentication: boolean, req: any): Promise<{}>;
    update(info: string, data: object, authentication: boolean, req: any): Promise<{}>;
    delete(info: string, id: number, authentication: boolean, req: any): Promise<{} | undefined>;
}
