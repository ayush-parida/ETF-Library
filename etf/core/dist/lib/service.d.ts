export declare class Service {
    private repo;
    validator: any;
    constructor(model: any, db: any, validator: any);
    get(): Promise<any>;
    create(req: object): Promise<{}>;
    update(req: object): Promise<{}>;
    delete(reqId: number): Promise<{}>;
}
