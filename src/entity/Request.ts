type fetcherFn = <T>(uri: string, method: string) => Promise<T>;

const defaultFetcher: fetcherFn = (uri, method) => fetch(uri, { method }).then((res) => res.json());

export class Request {
  protected baseUrl: string;

  protected fetcher: fetcherFn;

  constructor(baseUrl: string, fetcher?: fetcherFn) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher || defaultFetcher;
  }

  public call<T>(method: string, path: string): Promise<T> {
    return this.fetcher<T>(this.baseUrl + path, method);
  }
}

export default Request;
