import TableConnector from '~/entity/TableConnector';

describe('entity/TableConnector', () => {
  const baseUrl = 'foo.bar';
  const dbPath = '/prest/public/foo';
  const conn = new TableConnector(baseUrl, dbPath);
  const fakeResponse = 'foo';

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
});
