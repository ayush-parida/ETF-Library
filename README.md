
# Express Typescript Framework

This is a framework built using Express and Typescript to provide an API server for PostgreSQL DB.

The cli will generate a default module named user-management which will contain `customRoutes()` containing two custom API's `/login` and `refresh-token` which are used for authentication for the API's.

The project is divided into 2 Libraries [etf-cli](https://www.npmjs.com/package/etf-cli) and [etf-core](https://www.npmjs.com/package/etf-core)

## Installation

Install with npm

```bash
  mkdir project_name
  cd project_name
  npm install etf-cli -g
  npm install etf-core
  
```
Add the following dependencies and devDependencies to package.json

```bash
  "dependencies": {
    "body-parser": "^1.20.1",
    "etf-cli": "^0.1.1",
    "etf-core": "^0.0.7",
    "express": "^4.18.2",
    "@types/jsonwebtoken": "^8.5.9",
    "bcrypt-nodejs": "^0.0.3",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.8.0",
    "pine": "^1.1.1",
    "reflect-metadata": "^0.1.13",
    "sequelize": "^6.25.8",
    "sequelize-typescript": "^2.1.5",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.6.0"
  },
  "devDependencies": {
    "@types/bcrypt-nodejs": "^0.0.31",
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "dotenv": "^16.0.3",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.3",
    "@types/swagger-jsdoc": "^6.0.1",
    "@types/swagger-ui-express": "^4.1.3"
  }
```

To Create the server setup run the following commands

```bash
  etf -n
```

Settings to be done to start the server - 

- Configure your database connection in `db.config.ts`
- Configure your `secret` and `refresh` keys in `/src/middlewares/validateToken.ts`.

Run the Project

```bash
  npm run dev
```

Note - 

- For each module there are currently 5 Base API's present
```bash
- get method - to get all entries (/)
- get method - to get a single entry by id (/:id)
- post method - to create a new entry (/, body)
- put method - to update a single entry (/, body)
- delete method - to delete a single entry (/:id)
```

Creating New Modules
```bash
  etf -g module-name
```

TODO after module generation

- Create Module structure inside `/modules/module-name.model.ts`
- Import the `module-name.model.ts` class inside `db.config.ts` after `sequelize.addModels([User]);` in similar way to `User` where `User` will be replaced withe the `module-name.model.ts` class
- Create a variable for `module-name => moduleName` inside `app.ts`
- Initialize object on `module-name` from `module-name class` like `this.moduleName = new ModuleNameApi(this.db, new validateToken*())` inside `constructor`
- In `routes()` create an custom route for your module like `this.express.use(this.baseApiServerPath + "/moduleBasePath",this.moduleName.router);`

Configuring the API's for module-name

- `this.baseController` will add path after `/moduleBasePath` in the base api paths.
- `this.info` is used by logger to show a log for the module.
- Inside routes `{
        get: false,
        getId: false,
        post: false,
        put: false,
        delete: false,
      },` is passed. The first one is for wheather the module requires a JWT token for execution and the second is for weather the core API is active or not.

- The JWT token needs to be sent in the `header` as `authorization` in `Bearer token` format.
## Roadmap

The project is divided into 2 Libraries [etf-cli](https://www.npmjs.com/package/etf-cli) and [etf-core](https://www.npmjs.com/package/etf-core)

### etf-cli

Version - 0.2.x

- Implementation of DB Setup at `etf -n`
- Implementation of Module setup for `authorization` and `isActive` of core-api on module generation via `etf -g`

Version - 0.3.x

- Implementation of swagger-ui
- Implementation to pass Model name inside `module-name.model.ts`
- Implementation of auto addition of `module` in `app.ts` and auto addition of `model` in `db.config.ts`

### etf-core

Version - 0.1.2 (released)

- Addition of `get by id (get/:id)` API

Version - 0.2.x

- Addition of query params in API's

Version - 0.3.x

- Enhancement in `JWT` and `validateToken` functionality
- Addition of `csrfTokens` middleware


## Resolved Issues & New Features

### etf-core

Version - 0.1.2

- Addition of `get by id (get/:id)` API

### etf-cli

Version - 0.1.5

- Issue resolved for `etf -n` command execution
## Authors

- [@AllPlayer](http://github.com/AllPlayer/)

