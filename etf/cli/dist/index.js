#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const structTemplates_1 = require("./structTemplates");
const structToModelGenerator_1 = require("./structToModelGenerator");
const promises_1 = require("fs/promises");
const figlet = require("figlet");
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const program = new Command();
const { generateTemplateFilesBatch } = require("generate-template-files");
const version = require("../package.json").version;
const fs_1 = require("fs");
program
    .command("new")
    .description("Create new Server")
    .argument("<projectName>", "Name of Server")
    .action((projectName) => {
    generateProject(projectName);
});
program
    .command("generate")
    .description("Create new Module")
    .argument("<moduleName>", "Name of Module")
    .action((moduleName) => __awaiter(void 0, void 0, void 0, function* () {
    generateModule(moduleName, process.cwd());
}));
program
    .command("make")
    .description("Make models from Structs")
    .action(() => {
    makeModels(process.cwd());
});
program
    .command("list")
    .description("List all API Modules")
    .action(() => {
    try {
        listModules(process.cwd() + "/src/modules").then((res) => {
            console.table(res);
        });
    }
    catch (err) {
        console.log(err);
        console.log("Make Sure this is an ETF project");
    }
});
program
    .command("base-paths")
    .description("Access and modify base paths")
    .option("-c <name>", "Create new base path")
    .option("-l", "List existing base paths")
    .option("-e <id>", "Edit existing paths using id=newName")
    .option("-d <id>", "Delete existing path")
    .action(function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        let file = yield (0, promises_1.readFile)(process.cwd() + "/src/serverBasePaths.ts", "utf8");
        if (options.c) {
            let arrStr = "[" + file.split("[")[1].split("]")[0] + "]";
            let arr = JSON.parse(arrStr);
            if (!arr.includes("/" + options.c)) {
                let data = file.split("[")[0] +
                    "[" +
                    file.split("[")[1].split("]")[0] +
                    ', "/' +
                    options.c +
                    '"]\n}';
                (0, fs_1.writeFileSync)(process.cwd() + "/src/serverBasePaths.ts", data, {
                    flag: "w",
                });
            }
            else {
                console.error("Base Path Name already exists");
            }
        }
        if (options.l) {
            listBasePaths(file);
        }
        if (options.e) {
            let req = options.e.split("=");
            let arrStr = "[" + file.split("[")[1].split("]")[0] + "]";
            let arr = JSON.parse(arrStr);
            if (!arr.includes("/" + req[1])) {
                let modelsFile = yield (0, promises_1.readFile)(process.cwd() + "/src/serverModels.ts", "utf8");
                let models = modelsFile.split("=")[1];
                models = models.split("]")[0] + "]";
                models = models.split(",");
                models.forEach((element, i) => {
                    models[i] = element.replace(arr[req[0]], "/" + req[1]);
                });
                models = models.join(",");
                models =
                    modelsFile.split("=")[0] +
                        "=" +
                        models +
                        modelsFile.split("=")[1].split("]")[1];
                (0, fs_1.writeFileSync)(process.cwd() + "/src/serverModels.ts", models, {
                    flag: "w",
                });
                arr[req[0]] = "/" + req[1];
                let data = file.split("[")[0] + JSON.stringify(arr) + "\n}";
                let status = (0, fs_1.writeFileSync)(process.cwd() + "/src/serverBasePaths.ts", data, {
                    flag: "w",
                });
            }
            else {
                console.error("Base Path Name already exists");
            }
        }
        if (options.d) {
            let arrStr = "[" + file.split("[")[1].split("]")[0] + "]";
            let arr = JSON.parse(arrStr);
            if (arr.length > 1) {
                arr.splice(options.d, 1);
                let data = file.split("[")[0] + JSON.stringify(arr) + "\n}";
                (0, fs_1.writeFileSync)(process.cwd() + "/src/serverBasePaths.ts", data, {
                    flag: "w",
                });
            }
            else {
                console.error("Cannot Delete Last Path");
            }
        }
    });
});
program
    .command("db")
    .description("Access and modify db_configs")
    .option("-c <name>", "Create new db_config")
    .option("-l", "List existing db_configs")
    .option("-e <id>", "Edit existing db_configs using index of db_config")
    .option("-d <id>", "Delete existing db_config")
    .action(function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        let file = yield (0, promises_1.readFile)(process.cwd() + "/src/db_config.json", "utf8");
        let fileData = JSON.parse(JSON.parse(JSON.stringify(file)));
        let configNames = [];
        fileData.forEach((element) => {
            configNames.push(element.configName);
        });
        if (options.c) {
            if (!configNames.includes(options.c)) {
                createConfig(fileData, options.c, process.cwd());
            }
            else {
                console.error("Config Name already exists");
            }
        }
        if (options.l) {
            console.table(fileData);
        }
        if (options.e) {
            let req = options.e;
            let config = {
                configName: "",
                hostName: "",
                userName: "",
                password: "",
                database: "",
                port: "",
                dialect: "",
            };
            let question = new Question();
            yield question
                .question("Enter Config Name. Current(" + fileData[options.e].configName + "): ")
                .then((configName) => __awaiter(this, void 0, void 0, function* () {
                config.configName = configName;
                question.rl.close();
            }));
            question = new Question();
            yield question
                .question("Enter Hostname. Current(" + fileData[req[0]].hostName + "): ")
                .then((hostName) => __awaiter(this, void 0, void 0, function* () {
                config.hostName = hostName;
                question.rl.close();
            }));
            question = new Question();
            yield question
                .question("Enter Username. Current(" + fileData[req[0]].userName + "): ")
                .then((userName) => __awaiter(this, void 0, void 0, function* () {
                config.userName = userName;
                question.rl.close();
            }));
            question = new Question();
            yield question
                .question("Enter Password. Current(" + fileData[req[0]].password + "): ")
                .then((password) => {
                config.password = password;
                question.rl.close();
            });
            question = new Question();
            yield question
                .question("Enter Database Name. Current(" + fileData[req[0]].database + "): ")
                .then((database) => {
                config.database = database;
                question.rl.close();
            });
            question = new Question();
            yield question
                .question("Enter Database Port. Current(" + fileData[req[0]].port + "): ")
                .then((port) => {
                config.port = port;
                question.rl.close();
            });
            let types = [
                { id: 1, name: "mysql" },
                { id: 2, name: "postgres" },
                { id: 3, name: "sqlite" },
                { id: 4, name: "mariadb" },
                { id: 5, name: "mssql" },
                { id: 6, name: "db2" },
                { id: 7, name: "snowflake" },
                { id: 8, name: "oracle" },
            ];
            console.table(types);
            question = new Question();
            try {
                yield question
                    .question("Enter id of type of database from above options. Current(" +
                    fileData[req[0]].dialect +
                    "): ")
                    .then((inp) => {
                    function isTypeId(e, i, a) {
                        return e.id == inp;
                    }
                    config.dialect = types.filter(isTypeId)[0].name;
                });
            }
            catch (err) {
                console.error(err);
                console.error("Please select appropriate ID from the list");
            }
            let modelsFile = yield (0, promises_1.readFile)(process.cwd() + "/src/serverModels.ts", "utf8");
            let models = modelsFile.split("=")[1];
            models = models.split("]")[0] + "]";
            models = models.split(",");
            models.forEach((element, i) => {
                models[i] = element.replace('"' + fileData[options.e].configName + '"', '"' + config.configName + '"');
            });
            models = models.join(",");
            models =
                modelsFile.split("=")[0] +
                    "=" +
                    models +
                    modelsFile.split("=")[1].split("]")[1];
            (0, fs_1.writeFileSync)(process.cwd() + "/src/serverModels.ts", models, {
                flag: "w",
            });
            fileData[options.e] = config;
            let data = JSON.stringify(fileData);
            (0, fs_1.writeFileSync)(process.cwd() + "/src/db_config.json", data, {
                flag: "w",
            });
        }
        if (options.d) {
            if (fileData.length > 1) {
                fileData.splice(options.d, 1);
                let data = JSON.stringify(fileData);
                (0, fs_1.writeFileSync)(process.cwd() + "/src/db_config.json", data, {
                    flag: "w",
                });
            }
            else {
                console.error("Cannot Delete Last Config");
            }
        }
    });
});
program
    .command("module")
    .description("Access and modify several Module structures")
    .option("-l", "List models of all the modules")
    .option("-f <index>", "View fields of a module")
    .action(function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.l) {
            let path = process.cwd() + "/src/modules/";
            let structs = [];
            listModules(path).then((modules) => __awaiter(this, void 0, void 0, function* () {
                for (var element in modules) {
                    let file = yield (0, promises_1.readFile)(path +
                        modules[element]["Module Name"] +
                        "/" +
                        modules[element]["Module Name"] +
                        ".struct.json", "utf8");
                    let struct = JSON.parse(file);
                    struct = Object.assign(Object.assign({}, struct), modules[element]);
                    delete struct.api;
                    delete struct.apiPath;
                    delete struct.modelPath;
                    delete struct.modulePath;
                    delete struct.fields;
                    delete struct.keyValueAttribute;
                    delete struct.filePath;
                    structs.push(struct);
                }
                console.table(structs);
            }));
        }
        if (options.f) {
            let path = process.cwd() + "/src/modules/";
            let structs = [];
            listModules(path).then((modules) => __awaiter(this, void 0, void 0, function* () {
                for (var element in modules) {
                    if (element == options.f) {
                        let file = yield (0, promises_1.readFile)(path +
                            modules[element]["Module Name"] +
                            "/" +
                            modules[element]["Module Name"] +
                            ".struct.json", "utf8");
                        let struct = JSON.parse(file);
                        let fields = [];
                        struct.fields.forEach((element) => {
                            let field = {
                                "Column Name": element.COLUMN_NAME,
                                "Is Primary Key": element.primaryKey,
                                "Is Auto Increment": element.autoIncrement,
                                "Is Unique": element.UNIQUE,
                                "Is Required": element.REQUIRED,
                                "Column Type": element.COLUMN_TYPE,
                                "Default Value": element.DEFAULT_VALUE,
                                "Foreign Key": element.belongsToData.FOREIGN_COLUMN_NAME,
                            };
                            fields.push(field);
                        });
                        console.table(fields);
                    }
                }
            }));
        }
    });
});
program.version(version).description("Express TS Framework");
program.parse(process.argv);
const options = program.opts();
//list modules
function listModules(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs.promises.readdir(filepath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return {
                    "Module Name": file,
                    "Size (KB)": size,
                    "Created At": birthtime,
                };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            return detailedFiles;
        }
        catch (err) {
            console.error("No modules found. Ensure this is a ETF Project", err);
        }
    });
}
// cli checks
if (!process.argv.slice(2).length) {
    console.log(figlet.textSync("Express TS Framework"));
    console.log("Version: " + version);
    program.outputHelp();
}
// generate project and all files related to the project
function generateProject(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(projectName)) {
            fs.mkdirSync(projectName);
            let dirName = process.cwd() + "/" + projectName;
            generateTemplateFilesBatch([
                fileObjectGenerator("serverModels.ts", "", "src", dirName),
                fileObjectGenerator("db_config.json", "", "src", dirName),
                fileObjectGenerator("dbConfig.ts", "", "src", dirName),
                fileObjectGenerator("serverBasePaths.ts", "", "src", dirName),
                fileObjectGenerator("index.ts", "", "", dirName),
                fileObjectGenerator("nodemon.json", "", "", dirName),
                fileObjectGenerator("package.json", "", "", dirName),
                fileObjectGenerator("tsconfig.json", "", "", dirName),
                fileObjectGenerator("cors.ts", "", "src/middlewares", dirName),
                fileObjectGenerator("validateToken.ts", "", "src/middlewares", dirName),
                fileObjectGenerator("app.ts", "", "src", dirName),
            ]);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                let file = yield (0, promises_1.readFile)(dirName + "/src/db_config.json", "utf8");
                let fileData = JSON.parse(JSON.parse(JSON.stringify(file)));
                yield createConfig(fileData, "config_one", dirName).then(() => {
                    generateModule("user", dirName);
                });
            }), 5000);
        }
        else {
            console.error('Folder with name "' + projectName + '" already exists');
        }
    });
}
// generate new module and all files related to that
function generateModule(moduleName, dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let question = new Question();
        let tableTypes = [{ name: "Base" }, { name: "Auth" }];
        console.table(tableTypes);
        yield question.question("Select Table Type by Index: ").then((type) => __awaiter(this, void 0, void 0, function* () {
            question.rl.close();
            let files = null;
            let dirName = dirPath;
            let modulePath = "/modules/";
            if (type == "0") {
                files = yield moduleGenerator(moduleName, modulePath, dirName + "/src");
            }
            else if (type == "1") {
                moduleName = "auth-" + moduleName;
                files = yield authModuleGenerator(moduleName, modulePath, dirName + "/src");
            }
            else {
                console.log("Invalid Type");
            }
            yield generateTemplateFilesBatch(files).then(() => __awaiter(this, void 0, void 0, function* () {
                let struct = yield (0, promises_1.readFile)(dirName +
                    "/src" +
                    modulePath +
                    moduleName +
                    "/" +
                    moduleName +
                    ".struct.json", "utf8");
                let structData = JSON.parse(struct);
                let serverBasePaths = yield (0, promises_1.readFile)(dirName + "/src/serverBasePaths.ts", "utf8");
                listBasePaths(serverBasePaths);
                question = new Question();
                yield question
                    .question("Select Base Path by index: ")
                    .then((basePathIndex) => __awaiter(this, void 0, void 0, function* () {
                    let paths = serverBasePaths.split("[")[1].split("]")[0];
                    let basePath = paths.split(",");
                    question.rl.close();
                    let _path = basePath[parseInt(basePathIndex)].replace('"', "");
                    _path = _path.replace('"', "");
                    _path = _path.replace(" ", "");
                    structData.baseApiPath = _path;
                }));
                let db_config = yield (0, promises_1.readFile)(dirName + "/src/db_config.json", "utf8");
                let fileData = JSON.parse(JSON.parse(JSON.stringify(db_config)));
                console.table(fileData);
                question = new Question();
                yield question
                    .question("Select Config By Index: ")
                    .then((configIndex) => __awaiter(this, void 0, void 0, function* () {
                    let config = fileData[configIndex];
                    question.rl.close();
                    structData.configName = config.configName;
                }));
                (0, fs_1.writeFileSync)(dirName +
                    "/src" +
                    modulePath +
                    moduleName +
                    "/" +
                    moduleName +
                    ".struct.json", JSON.stringify(structData), {
                    flag: "w",
                });
                makeModels(dirName);
            }));
        }));
    });
}
function fileObjectGenerator(fileName, name, path, dirName) {
    if (path) {
        path = path + "/";
    }
    let file = {
        option: fileName,
        defaultCase: "(kebabCase)",
        entry: {
            folderPath: __dirname + "/templates/" + fileName.split(".")[0] + ".txt",
        },
        dynamicReplacers: [{ slot: "__module__", slotValue: name }],
        output: {
            path: dirName + "/" + path + fileName,
        },
    };
    return file;
}
// create new module
function moduleGenerator(name, path, dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [
            "*.api.ts",
            "*.controller.ts",
            "*.repository.ts",
            "*.struct.json",
        ];
        let res = [];
        files.forEach((element) => {
            let file = {
                option: element.split(".")[1],
                defaultCase: "(pascalCase)",
                entry: {
                    folderPath: __dirname + "/templates/__module__." + element.split(".")[1] + ".txt",
                },
                dynamicReplacers: [{ slot: "__module__", slotValue: name }],
                output: {
                    path: dirName +
                        path +
                        "__module__(kebabCase)/__module__(kebabCase)." +
                        element.split(".")[1] +
                        "." +
                        element.split(".")[2],
                    pathAndFileNameDefaultCase: "(pascalCase)",
                },
            };
            res.push(file);
        });
        return res;
    });
}
// create new auth-module
function authModuleGenerator(name, path, dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [
            "*.api.ts",
            "*.controller.ts",
            "*.repository.ts",
            "*.struct.json",
        ];
        let res = [];
        files.forEach((element) => {
            let file = {
                option: element.split(".")[1],
                defaultCase: "(pascalCase)",
                entry: {
                    folderPath: __dirname +
                        "/templates/auth-__module__." +
                        element.split(".")[1] +
                        ".txt",
                },
                dynamicReplacers: [{ slot: "__module__", slotValue: name }],
                output: {
                    path: dirName +
                        path +
                        "__module__(kebabCase)/__module__(kebabCase)." +
                        element.split(".")[1] +
                        "." +
                        element.split(".")[2],
                    pathAndFileNameDefaultCase: "(pascalCase)",
                },
            };
            res.push(file);
        });
        return res;
    });
}
// make module.model.ts from module.struct.json
function structToModel(model, dirName) {
    let templates = new structTemplates_1.StructTemplates();
    let generator = new structToModelGenerator_1.StructToModelGenerator(templates.templates, model);
    let fileData = generator.generateModel();
    generator.syncWriteFile(dirName + model.filePath + model.fileName, fileData);
}
// generate serverModels.ts
function generateServerModels(list, path, serverModulePath) {
    let template = {
        apiImport: 'import { %MODULE_API% } from "%MODULE_API_PATH%";',
        modelImport: 'import { %MODULE_MODEL% } from "%MODULE_MODEL_PATH%";',
        model: `\t{
      \t\tbaseApiPath: "%baseApiPath%",
      \t\tmodulePath: "%modulePath%",
      \t\tapi: %MODULE_API%,
      \t\tmodel: %MODULE_MODEL%,
      \t\tconfigName: "%configName%",
      \t\trouter: undefined,
    },`,
    };
    let models = [];
    let imports = [];
    let res = `%IMPORTS%\n\nexport class ServerModels{\n\tpublic models: any[] = [%MODELS%];\n}`;
    let out = "";
    list.then((modules) => __awaiter(this, void 0, void 0, function* () {
        for (var element in modules) {
            let file = yield (0, promises_1.readFile)(path +
                modules[element]["Module Name"] +
                "/" +
                modules[element]["Module Name"] +
                ".struct.json", "utf8");
            let struct = JSON.parse(file);
            let model = template.model.replace("%baseApiPath%", struct.baseApiPath);
            model = model.replace("%modulePath%", struct.modulePath);
            model = model.replace("%MODULE_API%", struct.api);
            model = model.replace("%MODULE_MODEL%", struct.model);
            model = model.replace("%configName%", struct.configName);
            models.push(model);
            let _import = template.apiImport.replace("%MODULE_API%", struct.api);
            _import = _import.replace("%MODULE_API_PATH%", struct.apiPath);
            _import = _import + "\n" + template.modelImport;
            _import = _import.replace("%MODULE_MODEL%", struct.model);
            _import = _import.replace("%MODULE_MODEL_PATH%", struct.modelPath);
            imports.push(_import);
        }
        out = res.replace("%IMPORTS%", imports.join("\n"));
        out = out.replace("%MODELS%", models.join("\n"));
        let status = true;
        try {
            (0, fs_1.writeFileSync)(serverModulePath + "/src/serverModels.ts", out, {
                flag: "w",
            });
            const contents = (0, fs_1.readFileSync)(serverModulePath + "/src/serverModels.ts", "utf-8");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            console.log(status ? "Successful" : "Failed");
        }
    }));
}
// run structToModel for all the modules and update serverModels.ts accordingly
function makeModels(dirName) {
    let path = dirName + "/src/modules/";
    try {
        listModules(path).then((res) => {
            res.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let file = yield (0, promises_1.readFile)(path +
                    element["Module Name"] +
                    "/" +
                    element["Module Name"] +
                    ".struct.json", "utf8");
                structToModel(JSON.parse(file), dirName + "/src");
            }));
        });
        generateServerModels(listModules(path), path, dirName);
    }
    catch (err) {
        console.log(err);
        console.log("Make Sure this is an ETF project");
    }
}
// show question and take input
const readline_1 = require("readline");
class Question {
    constructor() {
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        this.question = (questionText) => new Promise((resolve) => this.rl.question(questionText, resolve)).finally(() => this.rl.close());
    }
}
// add db_config.json
function createConfig(fileData, c, dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            configName: c,
            hostName: "",
            userName: "",
            password: "",
            database: "",
            port: "",
            dialect: "",
        };
        let question = new Question();
        yield question.question("Enter Hostname: ").then((hostName) => __awaiter(this, void 0, void 0, function* () {
            config.hostName = hostName;
            question.rl.close();
        }));
        question = new Question();
        yield question.question("Enter Username: ").then((userName) => __awaiter(this, void 0, void 0, function* () {
            config.userName = userName;
            question.rl.close();
        }));
        question = new Question();
        yield question.question("Enter Password: ").then((password) => {
            config.password = password;
            question.rl.close();
        });
        question = new Question();
        yield question.question("Enter Database Name: ").then((database) => {
            config.database = database;
            question.rl.close();
        });
        question = new Question();
        yield question.question("Enter Database Port: ").then((port) => {
            config.port = port;
            question.rl.close();
        });
        let types = [
            { id: 1, name: "mysql" },
            { id: 2, name: "postgres" },
            { id: 3, name: "sqlite" },
            { id: 4, name: "mariadb" },
            { id: 5, name: "mssql" },
            { id: 6, name: "db2" },
            { id: 7, name: "snowflake" },
            { id: 8, name: "oracle" },
        ];
        console.table(types);
        question = new Question();
        try {
            yield question
                .question("Enter id of type of database from above options: ")
                .then((inp) => {
                function isTypeId(e, i, a) {
                    return e.id == inp;
                }
                config.dialect = types.filter(isTypeId)[0].name;
            });
        }
        catch (err) {
            console.error(err);
            console.error("Please select appropriate ID from the list");
        }
        fileData.push(config);
        let data = JSON.stringify(fileData);
        (0, fs_1.writeFileSync)(dirName + "/src/db_config.json", data, {
            flag: "w",
        });
        return true;
    });
}
// list base paths from serverBasePaths.ts
function listBasePaths(file) {
    let paths = file.split("[")[1].split("]")[0];
    let res = [];
    paths.split(",").forEach((el, i) => {
        res.push({ "Path ID": i, "Path Name": el.split('"')[1] });
    });
    console.table(res);
}
// // Custom API design
// interface CustomApiSelect {
//   displayFields: DisplayField[];
//   isDistinct: boolean;
//   where: WhereCondition[];
// }
// interface WhereCondition {
//   condition: any;
// }
// interface DisplayField{
//   name: string;
//   as: string;
// }
//# sourceMappingURL=index.js.map