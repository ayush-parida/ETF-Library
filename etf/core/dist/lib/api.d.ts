import * as express from "express";
import { Controller } from "./controller";
import { Activated, AuthenticationSelect } from "./api.model";
export declare class Api {
    baseController: string;
    express: express.Application;
    controller: Controller;
    router: express.Router;
    constructor(model: any, db: any, validator: any, struct: any);
    routes(authentication: AuthenticationSelect, isActive: Activated): void;
}
