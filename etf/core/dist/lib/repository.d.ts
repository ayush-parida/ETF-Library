import { Count, DeleteMultiple, DeleteSingle, GetSpecific, PaginationResponse, PostMultiple, PostSingle, PutMultiple, PutSingle, ShortListing } from "./api.model";
interface Nested2 {
    displayKey: string;
    model: any;
    reference: string;
}
export declare class Repository {
    repo: any;
    includes: string[];
    model_includes: Nested2[];
    struct: any;
    attributes: string[];
    constructor(model: any, db: any, _struct: any);
    getCount(id?: any): Promise<Count>;
    getById(reqId: any, id?: any): Promise<GetSpecific>;
    get(params: any, id?: any): Promise<PaginationResponse>;
    create(req: any, id?: any): Promise<PostSingle>;
    createMultiple(req: any, id?: any): Promise<PostMultiple>;
    update(req: any, id?: any): Promise<PutSingle>;
    updateMultiple(req: any, id?: any): Promise<PutMultiple>;
    delete(reqId: any, id?: any): Promise<DeleteSingle>;
    deleteMultiple(reqId: any, id?: any): Promise<DeleteMultiple>;
    getKeyValuePairs(id?: any): Promise<ShortListing>;
}
export {};
