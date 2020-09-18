jest.mock('../../../src/entity/TableConnector');

import Api from '~/entity/Api';
import TableConnector from '~/entity/TableConnector';

describe('entity/Api', () => {
  const baseUrl = 'foo.bar';
  const api = new Api(baseUrl);
  const fakeResponse = 'foo';
  const database = 'prest';
  const schema = 'public';
  const table = 'foo';
  const expectedUrl = `/${database}/${schema}/${table}`;

  beforeEach(() => {
    api.call = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call .database() method correctly', async () => {
    (api.call as jest.Mock).mockResolvedValue(fakeResponse);

    const resp = await api.databases();
    expect(resp).toBe(fakeResponse);

    expect(api.call).toHaveBeenCalledTimes(1);
    expect(api.call).toHaveBeenCalledWith('get', '/databases');
  });

  it('should call .schemas() method correctly', async () => {
    (api.call as jest.Mock).mockResolvedValue(fakeResponse);

    const resp = await api.schemas();
    expect(resp).toBe(fakeResponse);

    expect(api.call).toHaveBeenCalledTimes(1);
    expect(api.call).toHaveBeenCalledWith('get', '/schemas');
  });

  it('should call .tables() method correctly', async () => {
    (api.call as jest.Mock).mockResolvedValue(fakeResponse);

    const resp = await api.tables();
    expect(resp).toBe(fakeResponse);

    expect(api.call).toHaveBeenCalledTimes(1);
    expect(api.call).toHaveBeenCalledWith('get', '/tables');
  });

  describe('.tableConnection', () => {
    it('should call correctly for string param', () => {
      (TableConnector as jest.Mock).mockImplementation(() => ({ fakeResponse }));

      expect(api.tableConnection(`${database}.${schema}.${table}`)).toEqual({ fakeResponse });
      expect(TableConnector).toHaveBeenCalledWith(baseUrl, expectedUrl);
    });

    it('should call correctly for splited params', () => {
      (TableConnector as jest.Mock).mockImplementation(() => ({ fakeResponse }));

      expect(api.tableConnection(database, schema, table)).toEqual({ fakeResponse });
      expect(TableConnector).toHaveBeenCalledWith(baseUrl, expectedUrl);
    });
  });

  describe('.tablesByDBInSchema()', () => {
    it('should call correctly for string param', async () => {
      (api.call as jest.Mock).mockResolvedValue(fakeResponse);

      const resp = await api.tablesByDBInSchema(`${database}.${schema}`);

      expect(resp).toBe(fakeResponse);
      expect(api.call).toHaveBeenCalledWith('get', `/${database}/${schema}`);
    });

    it('should call correctly for splited params', async () => {
      (api.call as jest.Mock).mockResolvedValue(fakeResponse);

      const resp = await api.tablesByDBInSchema(database, schema);

      expect(resp).toBe(fakeResponse);
      expect(api.call).toHaveBeenCalledWith('get', `/${database}/${schema}`);
    });
  });

  describe('.show()', () => {
    it('should call correctly for string param', async () => {
      (api.call as jest.Mock).mockResolvedValue(fakeResponse);

      const resp = await api.show(`${database}.${schema}.${table}`);
      expect(resp).toBe(fakeResponse);

      expect(api.call).toHaveBeenCalledTimes(1);
      expect(api.call).toHaveBeenCalledWith('get', '/show' + expectedUrl);
    });

    it('should call correctly for splited param', async () => {
      (api.call as jest.Mock).mockResolvedValue(fakeResponse);

      const resp = await api.show(database, schema, table);
      expect(resp).toBe(fakeResponse);

      expect(api.call).toHaveBeenCalledTimes(1);
      expect(api.call).toHaveBeenCalledWith('get', '/show' + expectedUrl);
    });
  });
});
