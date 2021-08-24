import TableConnector from '~/entity/TableConnector';
import Query from '~/entity/Query';

describe('entity/TableConnector', () => {
  const baseUrl = 'foo.bar';
  const dbPath = '/prest/public/foo';
  const conn = new TableConnector(baseUrl, dbPath);
  const fakeResponse = 'foo';
  const fakeData = { foo: 'bar' };
  const fakeId = 'abc';

  beforeEach(() => {
    conn.call = jest.fn().mockReturnValue(fakeResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('.query()', () => {
    it('should execute .query() without any query', async () => {
      const resp = await conn.query();

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('get', dbPath);
    });

    it('should execute .query() without a query', async () => {
      const query = new Query({ $eq: fakeData });
      const resp = await conn.query(query);

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('get', dbPath + query.serialize());
    });
  });

  describe('.delete()', () => {
    it('should execute .delete(ID) interface', async () => {
      const resp = await conn.delete(fakeId);

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('delete', `${dbPath}?id=$eq.${fakeId}`);
    });

    it('should execute .delete(query) interface', async () => {
      const query = new Query({ $like: fakeData });
      const resp = await conn.delete(query);

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('delete', dbPath + query.serialize());
    });
  });

  describe('.update()', () => {
    it('should execute .update(ID) interface', async () => {
      const resp = await conn.update(fakeId, fakeData);

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('put', `${dbPath}?id=$eq.${fakeId}`, fakeData);
    });

    it('should execute .update(query) interface', async () => {
      const query = new Query({ $like: fakeData });
      const resp = await conn.update(query, fakeData);

      expect(resp).toBe(fakeResponse);
      expect(conn.call).toHaveBeenCalledTimes(1);
      expect(conn.call).toHaveBeenCalledWith('put', dbPath + query.serialize(), fakeData);
    });
  });

  it('should execute .create() correctly', async () => {
    const resp = await conn.create(fakeData);

    expect(resp).toBe(fakeResponse);
    expect(conn.call).toHaveBeenCalledTimes(1);
    expect(conn.call).toHaveBeenCalledWith('post', dbPath, fakeData);
  });
});
