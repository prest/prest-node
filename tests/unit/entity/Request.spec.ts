
import fetchMock from "jest-fetch-mock"
import Request from '~/entity/Request';

describe('entity/Request', () => {
  it('should execute call and get the response', async () => {
    const data = 'foo';
    const baseUrl = 'bar';
    const method = 'get';
    fetchMock.mockResolvedValue(new Response(JSON.stringify(data)));

    const req = new Request(baseUrl);
    const resp = await req.call(method, '');

    expect(resp).toBe(data);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(baseUrl, { method });
  });
});
