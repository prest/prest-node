jest.mock('../../src/http', () => ({
  makeRequest: jest.fn().mockImplementation((method, path) => ({ method, path })),
}));

import { showAllDbs, showAllSchemas, showAllTables, showAllTablesBySchema } from '~/api';

describe('src/api', () => {
  it('should be call makeRequest for showAllDbs with correctly params', () => {
    expect(showAllDbs).toHaveProperty('method', 'get');
    expect(showAllDbs).toHaveProperty('path', '/databases');
  });

  it('should be call makeRequest for showAllSchemas with correctly params', () => {
    expect(showAllSchemas).toHaveProperty('method', 'get');
    expect(showAllSchemas).toHaveProperty('path', '/schemas');
  });

  it('should be call makeRequest for showAllTables with correctly params', () => {
    expect(showAllTables).toHaveProperty('method', 'get');
    expect(showAllTables).toHaveProperty('path', '/tables');
  });

  it('should be call makeRequest for showAllTablesBySchema with correctly params', () => {
    expect(showAllTablesBySchema).toHaveProperty('method', 'get');
    expect(showAllTablesBySchema).toHaveProperty('path', '/{{db}}/{{schema}}');
  });
});
