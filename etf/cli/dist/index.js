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
program
    .version(version)
    .description("Express TS Framework")
    .option("-l, --ls", "List All API Modules")
    .option("-n, --new <value>", "Create New Server")
    .option("-g, --generate <value>", "Create a API Module")
    .option("-m, --make", "Create Models from structs")
    .parse(process.argv);
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
if (options.ls) {
    try {
        listModules(process.cwd() + "/src/modules").then((res) => {
            console.table(res);
        });
    }
    catch (err) {
        console.log(err);
        console.log("Make Sure this is an ETF project");
    }
}
if (options.new) {
    generateProject(options.new);
}
function generateProject(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(projectName)) {
            fs.mkdirSync(projectName);
            let dirName = process.cwd() + "/" + projectName;
            generateTemplateFilesBatch([
                fileObjectGenerator("index.ts", "", "", dirName),
                fileObjectGenerator("nodemon.json", "", "", dirName),
                fileObjectGenerator("package.json", "", "", dirName),
                fileObjectGenerator("tsconfig.json", "", "", dirName),
                fileObjectGenerator("cors.ts", "", "src/middlewares", dirName),
                fileObjectGenerator("validateToken.ts", "", "src/middlewares", dirName),
                fileObjectGenerator("app.ts", "", "src", dirName),
                fileObjectGenerator("serverModels.ts", "", "src", dirName),
                fileObjectGenerator("db_config.json", "", "src", dirName),
                fileObjectGenerator("dbConfig.ts", "", "src", dirName),
            ]);
            generateModule("user", dirName + "/src");
        }
        else {
            console.error('Folder with name "' + projectName + '" already exists');
        }
    });
}
if (options.generate) {
    generateModule(options.generate, process.cwd() + "/src");
}
function generateModule(moduleName, dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirName = dirPath;
        let modulePath = "/modules/";
        let files = yield moduleGenerator(moduleName, modulePath, dirName);
        yield generateTemplateFilesBatch(files);
        let structPath = dirName + modulePath + moduleName + "/" + moduleName + ".struct.json";
        const file = yield (0, promises_1.readFile)(structPath, "utf8");
        structToModel(JSON.parse(file), dirName);
    });
}
if (options.make) {
    makeModels(process.cwd());
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
function structToModel(model, dirName) {
    let templates = new structTemplates_1.StructTemplates();
    let generator = new structToModelGenerator_1.StructToModelGenerator(templates.templates, model);
    let fileData = generator.generateModel();
    generator.syncWriteFile(dirName + model.filePath + model.fileName, fileData);
}
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
    }
    catch (err) {
        console.log(err);
        console.log("Make Sure this is an ETF project");
    }
}
//# sourceMappingURL=index.js.map