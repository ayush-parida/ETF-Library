#! /usr/bin/env node

const figlet = require("figlet");
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const program = new Command();
const { generateTemplateFilesBatch } = require("generate-template-files");
const version = require("../package.json").version;

program
  .version(version)
  .description("Express TS Framework for Creating Servers")
  .option("-l, --ls", "List All API Modules")
  .option("-n, --new", "Create New Express TS Server")
  .option("-g, --generate <value>", "Create a API Module")
  .parse(process.argv);

const options = program.opts();

//list modules
async function listModules(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
      const { size, birthtime } = fileDetails;
      return {
        "Module Name": file,
        "Size (KB)": size,
        "Created At": birthtime,
      };
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (err) {
    console.error("No modules found. Ensure this is a ETF Project", err);
  }
}

//create a directory
function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log("The directory has been created successfully");
  }
}

//create a file
function createFile(filepath: string) {
  fs.openSync(filepath, "w");
  console.log("An empty file has been created");
}

// cli checks

if (!process.argv.slice(2).length) {
  console.log(figlet.textSync("Express TS Framework"));
  console.log("Version: " + version);
  program.outputHelp();
}
if (options.ls) {
  try {
    listModules(process.cwd() + "/src/modules");
  } catch (err) {
    console.log(err);
    console.log("Make Sure this is an ETF project");
  }
}
if (options.new) {
  generateProject();
}
if (options.generate) {
  //   createDir(path.resolve(__dirname, options.generate));
  generateModule(options.generate);
  // files.forEach((element) => {
  //   createFile(
  //     path.resolve(
  //       __dirname + "/../../modules/" + options.generate,
  //       options.generate + "." + element + ".ts"
  //     )
  //   );
  // });
}
function generateProject() {
  let name = "";
  generateTemplateFilesBatch([
    {
      option: "API",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname + "/templates/user-management/user-management.api.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() + "/src/modules/user-management/user-management.api.ts",
      },
    },
    {
      option: "Controller",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname +
          "/templates/user-management/user-management.controller.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/user-management/user-management.controller.ts",
      },
    },
    {
      option: "Logger",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname + "/templates/user-management/user-management.logger.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/user-management/user-management.logger.ts",
      },
    },
    {
      option: "Model",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname + "/templates/user-management/user-management.model.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/user-management/user-management.model.ts",
      },
    },
    {
      option: "Repository",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname +
          "/templates/user-management/user-management.repository.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/user-management/user-management.repository.ts",
      },
    },
    {
      option: "Service",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath:
          __dirname + "/templates/user-management/user-management.service.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/user-management/user-management.service.ts",
      },
    },
    {
      option: "Cors",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/middlewares/cors.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/src/middlewares/cors.ts",
      },
    },
    {
      option: "csrfToken",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/middlewares/csrfToken.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/src/middlewares/csrfToken.ts",
      },
    },
    {
      option: "Cors",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/middlewares/validateToken.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/src/middlewares/validateToken.ts",
      },
    },
    {
      option: "DB-Config",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/db.config.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/db.config.ts",
      },
    },
    {
      option: "App",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/app.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/app.ts",
      },
    },
    {
      option: "Index",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/index.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/index.ts",
      },
    },
    {
      option: "tsconfig",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/tsconfig.json",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/tsconfig.json",
      },
    },
    {
      option: "nodemon",
      defaultCase: "(kebabCase)",
      entry: {
        folderPath: __dirname + "/templates/nodemon.json",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path: process.cwd() + "/nodemon.json",
      },
    },
  ]);
}
function generateModule(name: string) {
  generateTemplateFilesBatch([
    {
      option: "API",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.api.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).api.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
    {
      option: "Controller",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.controller.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).controller.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
    {
      option: "Model",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.model.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).model.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
    {
      option: "Service",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.service.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).service.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
    {
      option: "Logger",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.logger.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).logger.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
    {
      option: "Repository",
      defaultCase: "(pascalCase)",
      entry: {
        folderPath: __dirname + "/templates/__module__.repository.txt",
      },
      dynamicReplacers: [{ slot: "__module__", slotValue: name }],
      output: {
        path:
          process.cwd() +
          "/src/modules/__module__(kebabCase)/__module__(kebabCase).repository.ts",
        pathAndFileNameDefaultCase: "(pascalCase)",
      },
    },
  ]);
}
//   createDir(path.resolve(__dirname, options.mkdir));
//   createFile(path.resolve(__dirname, options.touch));

// const moduleTemplate = {
//     api: n => ''
// }
