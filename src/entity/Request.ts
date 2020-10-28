import fetch from 'node-fetch';

type fetcherFn = <T>(uri: string, method: string, data?: T | Partial<T>) => Promise<T>;

const defaultFetcher: fetcherFn = (uri, method, data) => {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(!data ? {} : { body: JSON.stringify(data) }),
  };

  return fetch(uri, opts).then((res) => res.json());
};

export class Request {
  protected baseUrl: string;

  protected fetcher: fetcherFn;

  constructor(baseUrl: string, fetcher?: fetcherFn) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher || defaultFetcher;
  }

  public call<T>(method: string, path: string, data?: T | Partial<T>): Promise<T> {
    return this.fetcher<T>(this.baseUrl + path, method, data);
  }
}

export default Request;
