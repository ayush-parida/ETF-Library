import * as express from "express";
import { Controller } from "./controller";
import { AuthenticationSelect } from "./authencication.model";
export declare class Api {
    info: string;
    baseController: string;
    express: express.Application;
    controller: Controller;
    router: express.Router;
    constructor(model: any, db: any, validator: any);
    routes(authentication: AuthenticationSelect, isActive: AuthenticationSelect): void;
}
