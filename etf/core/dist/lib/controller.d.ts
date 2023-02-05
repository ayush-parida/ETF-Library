import { Count, DeleteMultiple, DeleteSingle, GetSpecific, PaginationResponse, PostMultiple, PostSingle, PutMultiple, PutSingle, ShortListing } from "./api.model";
export declare class Controller {
    private repo;
    validator: any;
    constructor(model: any, db: any, validator: any, struct: any);
    getCount(authentication: boolean, req: any): Promise<Count | {
        resp: Count;
    }>;
    getById(id: any, authentication: boolean, req: any): Promise<GetSpecific | {
        resp: GetSpecific;
    }>;
    get(authentication: boolean, req: any): Promise<PaginationResponse | {
        resp: PaginationResponse;
    }>;
    create(data: object, authentication: boolean, req: any): Promise<PostSingle | {
        resp: PostSingle;
    }>;
    createMultiple(data: object, authentication: boolean, req: any): Promise<PostMultiple | {
        resp: PostMultiple;
    }>;
    update(data: object, authentication: boolean, req: any): Promise<PutSingle | {
        resp: PutSingle;
    }>;
    updateMultiple(data: object, authentication: boolean, req: any): Promise<PutMultiple | {
        resp: PutMultiple;
    }>;
    delete(id: number, authentication: boolean, req: any): Promise<DeleteSingle | {
        resp: DeleteSingle;
    }>;
    deleteMultiple(id: number, authentication: boolean, req: any): Promise<DeleteSingle | {
        resp: DeleteMultiple;
    }>;
    getKeyValuePairs(authentication: boolean, req: any): Promise<ShortListing | {
        resp: ShortListing;
    }>;
}
