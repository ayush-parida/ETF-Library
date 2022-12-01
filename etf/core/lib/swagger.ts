import * as fs from "fs";
export class Swagger {
  private swaggerFile: any = process.cwd() + "/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/swagger/swagger.css",
    "utf8"
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
}
