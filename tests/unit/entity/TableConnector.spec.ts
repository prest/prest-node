import TableConnector from '~/entity/TableConnector';

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

  it('should execute .query() correctly', async () => {
    const resp = await conn.query();

    expect(resp).toBe(fakeResponse);
    expect(conn.call).toHaveBeenCalledTimes(1);
    expect(conn.call).toHaveBeenCalledWith('get', dbPath);
  });

  it('should execute .create() correctly', async () => {
    const resp = await conn.create(fakeData);

    expect(resp).toBe(fakeResponse);
    expect(conn.call).toHaveBeenCalledTimes(1);
    expect(conn.call).toHaveBeenCalledWith('post', dbPath, fakeData);
  });

  it('should execute .update() correctly', async () => {
    const resp = await conn.update(fakeId, fakeData);

    expect(resp).toBe(fakeResponse);
    expect(conn.call).toHaveBeenCalledTimes(1);
    expect(conn.call).toHaveBeenCalledWith('patch', `${dbPath}?id=${fakeId}`, fakeData);
  });

  it('should execute .delete() correctly', async () => {
    const resp = await conn.delete(fakeId);

    expect(resp).toBe(fakeResponse);
    expect(conn.call).toHaveBeenCalledTimes(1);
    expect(conn.call).toHaveBeenCalledWith('delete', `${dbPath}?id=${fakeId}`);
  });
});
