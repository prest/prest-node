jest.mock('axios');

import Request from '~/entity/Request';
import axios from 'axios';

describe('entity/Request', () => {
  it('should execute call and get the response', async () => {
    const data = 'foo';
    const baseUrl = 'bar';
    (axios.get as jest.Mock).mockResolvedValue({ data });

    const req = new Request(baseUrl);
    const resp = await req.call('get', '');

    expect(resp).toBe(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(baseUrl);
  });
});
