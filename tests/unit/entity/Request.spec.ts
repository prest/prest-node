import fetchMock from 'jest-fetch-mock';
import Request from '~/entity/Request';

describe('entity/Request', () => {
  const headers = { 'Content-Type': 'application/json' };
  const data = 'foo';
  const baseUrl = 'bar';
  const method = 'get';

  beforeEach(() => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(data)));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should execute call and get the response without data', async () => {
    const req = new Request({ baseUrl });
    const resp = await req.call(method, '');

    expect(resp).toBe(data);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(baseUrl, { method, headers });
  });

  it('should execute call and get the response with data', async () => {
    const fakeBody = { foo: 'bar' };
    const req = new Request({ baseUrl });
    const resp = await req.call(method, '', fakeBody);

    const body = JSON.stringify(fakeBody);
    expect(resp).toBe(data);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(baseUrl, { method, headers, body });
  });
});
