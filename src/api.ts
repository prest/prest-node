import { makeRequest } from './http';

export const showAllDbs = makeRequest('get', '/databases');
export const showAllSchemas = makeRequest('get', '/schemas');
export const showAllTables = makeRequest('get', '/tables');
export const showAllTablesBySchema = makeRequest('get', '/{{db}}/{{schema}}');
