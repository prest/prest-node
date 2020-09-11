jest.mock('axios');
jest.mock('../../src/store');

import axios from 'axios';
import { makeRequest } from '~/http';
import { getOptions } from '~/store';

describe('src/http/makeRequest', () => {
  const fakeResponse = 'foo';
  const fakeUrl = '/bar';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  ['post', 'put'].forEach((method) => {
    it(`should makeRequest return a ${method} method`, async () => {
      const path = '/test';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue({ baseUrl: fakeUrl });
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req();

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + path, {});
      expect(response).toBe(fakeResponse);
    });

    it(`should makeRequest return a ${method} with optin url method`, async () => {
      const opts = { baseUrl: fakeUrl, x: 1 };
      const path = '/{{x}}';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue(opts);
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req();

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + `/${opts.x}`, {});
      expect(response).toBe(fakeResponse);
    });

    it(`should makeRequest return a ${method} with data`, async () => {
      const opts = { baseUrl: fakeUrl, db: 'fizz' };
      const data = { fake: 1 };
      const path = '/{{db}}';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue(opts);
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req(data);

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + `/${opts.db}`, data);
      expect(response).toBe(fakeResponse);
    });
  });

  ['get', 'delete'].forEach((method) => {
    it(`should makeRequest return a ${method} method`, async () => {
      const path = '/test';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue({ baseUrl: fakeUrl });
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req();

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + path);
      expect(response).toBe(fakeResponse);
    });

    it(`should makeRequest return a ${method} with optin url method`, async () => {
      const opts = { baseUrl: fakeUrl, x: 1 };
      const path = '/{{x}}';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue(opts);
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req();

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + `/${opts.x}`);
      expect(response).toBe(fakeResponse);
    });

    it(`should makeRequest return a ${method} with data`, async () => {
      const opts = { baseUrl: fakeUrl, db: 'fizz' };
      const dataKey = 'fake';
      const data = { [dataKey]: 1 };
      const path = '/{{db}}';
      const req = makeRequest(method, path);

      (getOptions as jest.Mock).mockReturnValue(opts);
      (axios[method] as jest.Mock).mockResolvedValue({ data: fakeResponse });
      const response = await req(data);

      expect(axios[method]).toHaveBeenCalledTimes(1);
      expect(axios[method]).toHaveBeenCalledWith(fakeUrl + `/${opts.db}?${dataKey}=${data[dataKey]}`);
      expect(response).toBe(fakeResponse);
    });
  });
});
