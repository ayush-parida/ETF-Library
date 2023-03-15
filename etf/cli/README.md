
# Express Typescript Framework

This is a framework built using Express and Typescript to provide an API server for SQL types of DBs which can be used together with each other.
This is a dynamic server to provide instant API's based on models.
The focus of this is to provide all the following API's by execution of a command.
The server primarily runs on NodeJS along with ExpressTS.

The project is divided into 2 Libraries [etf-cli](https://www.npmjs.com/package/etf-cli) and [etf-core](https://www.npmjs.com/package/etf-core)

All the apis will have a prefix of their collection / table names or as per user assigned name.

## Installation

Install with npm

```bash
npm i etf-cli -g
etf new <projectName>
cd <projectName>
npm i
```
Settings to be done before start of the server - 

- Configure your database connection in `dbConfig.json`
- Configure your `secret` and `refresh` keys in `/src/middlewares/validateToken.ts`.

Settings to be done while creating or updating models

- To change the fields or their properties you need to alter the <module>.struct.json file present within the "/src/modules/<module>"
Note - The models.ts file is auto generated when the project is served so do not alter that.

- model.ts files can be rebuilt by running `etf --make or etf -m` in the project root folder.

## API's Provided
- `/count (GET)` - Return count of entries for specific Table / Collection
- `/:id (GET)` - Return Specific Entry based on `id` or `_id` of the item present in collection
- `/ (GET)` - Return List of Entries which have `is_active=True`
- `/ (POST)` - Create a new Entry
- `/multiple (POST)` - Create multiple new entries for same collection
- `/:id (PUT)` - Update a single entry based on `id` or `_id`
- `/multiple (PUT)` - Update multiple entires for same collection
- `/:id (DELETE)` - Delete single entry based on `id` or `_id`
- `/ (DELETE)` - Delete multiple entries for same collection
- `/short-listing (GET)` - Return list of `Key Value Pairs` for the collection with all the entries(PENDING)
- `/upload` - Upload files respective to the Module and `id` or `_id` (PENDING)

#### Notes
- `is_active` will define if a entry is deleted or not
- In real no entry is deleted from DB and only `is_active` is set to `False`
- By default `/ (GET)` will return specific entries based on the pagination provided
- The (objects for collection / columns for table / keys for the items) will be created inside the models file available for each (module / table / collection). Module in this case is the file structure created by the API Server


### `/count (GET)`
This will return a single object belonging to the following interface

```ts
interface Count{    
    code: 200|400|401;
    message: string;
    count: number;
}
```
### `/:id (GET)`
This will return a single object belonging to the Model of the Collection where `is_active=True` inside an object belonging to following interface

```ts
interface GetSpecific{
    code: 200|400|404|401;
    message: string;
    data: CollectionModel|{}
}
```

### `/ (GET)`
This will return multiple objects of the collection in a pagination object belonging to the PaginationResponse interface

```ts
export interface MetaColumn {
  name: string;
  type:
    | "_id"
    | "text"
    | "number"
    | "bool"
    | "email"
    | "url"
    | "datetime"
    | "select"
    | "json"
    | "file"
    | "relation";
  displayName?: string;
  sorting: boolean;
  sortingOrder: boolean;
  visible: boolean;
}

interface PaginationResponse{
    code: 200|400|401;
    message: string;
    data: {
        meta: {
            columns: MetaColumn[]
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number;
            };
        },
        rows: CollectionModel[]
    }
}
```

This API can also take the following request params | path params
- nested=1|0;
- page: number;
- page_size: number;
- order_by: ColumnName|ObjectKey;
- order: 'ASC'|'DESC'

Note - the keys visible in the response can be configured on the Server Side


### `/ (POST)`

This will create a single entry in the collection | table and will return response belonging to following interface

```ts
interface PostSingle{
    code: 200|400|401;
    message: string;
    data: createdObject;
}
```

### `/multiple (POST)`

This will create multiple entries belonging to same collection | table and will return response belonging to following interface

```ts
interface PostMultiple{
    code: 200|400|401;
    message: string;
    data: createdObject[];
}
```

### `/:id (PUT)`

This will update a single entry and will return response belonging to following interface

```ts
interface PutSingle{
    code: 200|400|401;
    message: string;
    data: updatedObject;
}
```

### `/multiple (PUT)`

This will update entries belonging to same collection | table and will return response belonging to following interface


```ts
interface PutMultiple{
    code: 200|400|401;
    message: string;
    data: updatedObject[];
}
```

### `/:id (DELETE)`

This will delete a single entry and will return response belonging to following interface

```ts
interface DeleteSingle{
    code: 200|400|401;
    message: string;
    data: deletedObjectId;
}
```

### `/multiple (DELETE)`

This will delete entries belonging to same collection | table and will return response belonging to following interface


```ts
interface PutMultiple{
    code: 200|400|401;
    message: string;
    data: deletedObjectId[];
}
```

### `/short-listing (GET)`

Return list of `Key Value Pairs` for the collection with all the entries belonging to following interface


```ts
interface KeyValuePair{
    name: string;
    value: number;
}
interface ShortListing{
    code: 200|400|401;
    message: string;
    data: KeyValuePair[];
}
```
Note name and value inside KeyValuePair needs to be configured on server side.

## New Modules

To Create new Modules use the command
```
etf generate <module-name>
```
It will ask for a Table Type
If you want to make it normal table use 'Base'
If you want to provide authentication using the table use 'Auth'

If you select Auth it will provide you additional API's

`/module-name/register`

`/module-name/login`

`/module-name/refresh-token`

## Authors

- [@AllPlayer](http://github.com/AllPlayer/)

