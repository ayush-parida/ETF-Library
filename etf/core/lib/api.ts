import * as express from "express";
import * as bodyParser from "body-parser";
import { Controller } from "./controller";
import { AuthenticationSelect } from "./authencication.model";

export class Api {
  info!: string;
  baseController!: string;
  express: express.Application;
  controller: Controller;
  router: express.Router;

  constructor(model: any, db: any, validator: any) {
    this.express = express();
    this.router = this.express;
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.controller = new Controller(model, db, validator);
  }

  public routes(
    baseController: string,
    info: string,
    authentication: AuthenticationSelect,
    isActive: AuthenticationSelect
  ): void {
    if (isActive.get)
      this.router.get(this.baseController, (req, res) => {
        this.controller
          .get(this.info, authentication.get, req)
          .then((data) => res.json(data));
      });
    if (isActive.post)
      this.router.post(this.baseController, (req, res) => {
        this.controller
          .create(this.info, req.body, authentication.post, req)
          .then((data) => res.json(data));
      });
    if (isActive.put)
      this.router.put(this.baseController, (req, res) => {
        this.controller
          .update(this.info, req.body, authentication.put, req)
          .then((data) => res.json(data));
      });
    if (isActive.delete)
      this.router.delete(this.baseController + "/:id", (req, res) => {
        this.controller
          .delete(
            this.info,
            parseInt(req.params.id),
            authentication.delete,
            req
          )
          .then((data) => res.json(data));
      });
  }
}
