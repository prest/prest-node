# @postgresrest/node
This is a nodejs' client to use _p_**Rest** api.

[![Actions Status](https://github.com/prest/prest-node/workflows/Test,%20Build%20and%20Deploy/badge.svg)](https://github.com/prest/prest-node/actions) [![Coverage Status](https://coveralls.io/repos/github/prest/prest-node/badge.svg?branch=master)](https://coveralls.io/github/prest/prest-node?branch=master)


## Resume
- Introduction
  - Motivation
  - How Install / Setup
- Basic API
  - databases()
  - schemas()
  - tables()
  - show()
- Table API
  - What is a TableConnector entity?
  - query()


-------------------


## Introduction
### Motivation
_p_**Rest** is a GoLang service that's simplify and accelerate development, instant, realtime, high-performance on any Postgres application, existing or new. To extends this functionalities we decided to a client in javascript/typescript to make easiest the life of someone that wants to consume _p_**Rest** api across javascript applications.

### How Install
You can install using NPM
`npm install @postgresrest/node --save`

or yarn
`yarn add @postgresrest/node -S`

After it, you should create a instance of PRestAPI:
```typescript
import PRestApi from '@postgresrest/node';

const cli = new PRestApi('myhost');
```

or if you want you can use custom fetcher with any fetch tool you'd like:

```typescript
import axios from 'axios';

const fetcher = (uri, method) => axios[method](uri).then(({data}) => data);
const cli = new PRestApi('myhost', fetcher);
```

-------------------



## Basic API
You can find all routes that we consume in this section [here](https://docs.postgres.rest/query-statements/#select---get)

### databases(): Promise<PRestDatabase[]>
`cli.databases()` will reflect the `/databases` _p_**Rest** endpoint. It will return all databases from your Postgres instance, you are able to use `PRestDatabase` type too (if you are in a Typescript environment).

### schemas(): Promise<PRestSchema[]>
`cli.schemas()` will reflect the `/schemas` _p_**Rest** endpoint. It will return all schemas from your Postgres instance, you are able to use `PRestSchema` type too (if you are in a Typescript environment).

### tables(): Promise<PRestTable[]>
`cli.tables()` will reflect the `/tables` _p_**Rest** endpoint. It will return all tables from your Postgres instance, you are able to use `PRestTable` type too (if you are in a Typescript environment).

### tablesByDBInSchema(...entries: string[]): Promise<PRestTable[]>
It will reflect the `/tables` _p_**Rest** endpoint. It will return all tables from your Postgres instance, you are able to use `PRestTable` type too (if you are in a Typescript environment).

Usage sample:
```typescript
const structure = await cli.tablesByDBInSchema('db', 'schema', 'table');
const structure = await cli.tablesByDBInSchema('db.schema.table');
```

### show(...entries: string[]): Promise<PRestTableShowItem[]>
It will reflect the `/show/DATABASE/SCHEMA/TABLE` _p_**Rest** endpoint. It will return the structure of a specific table in a specific database and schema, you are able to use `PRestTableShowItem` type too (if you are in a Typescript environment).

Usage sample:
```typescript
const structure = await cli.show('db', 'schema', 'table');
const structure = await cli.show('db.schema.table');
```

### tableConnection<T>(...entries: string[]): TableConnector<T>
It will return a [TableConnector] instance to manipulate table actions.

Usage sample:
```typescript
const structure = cli.tableConnection('db', 'schema', 'table');
const structure = cli.tableConnection('db.schema.table');
```


-------------------


## Table API
### What is a TableConnector entity?
To simplify the API consume, we created a entity to control query and batches by a table namespace. This object could be retrived using the method [tableConnection]()

### query
It will reflect `/DATABASE/SCHEMA/TABLE` prest endpoint.

Usage sample:
```typescript
const data = await cli.tableConnection('db', 'schema', 'table').query();
```



-------------------


## Ideas

> Add and `PRestOptions` structure to `PRestApi` object, to automatic add some kind of options like: `_renderer=xml`

> Create a `PRestQuery` to format this query statements (https://docs.postgres.rest/query-statements) in a simple structure:

```typescript
const query = new PRestQuery();
query.eq('x');
query.like('x');
query.pagination({ size: 2, page: 1 });

cli.query(query) // ?$eq=x&$like=x&_page=1&_page_size=2

```

> Create a .view() method to reflect .query() method (abstract it)

> Create a .batch() method

> Send this Readme to a more complete documentation (remove actual typedoc)
