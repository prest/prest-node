import axios, { Method } from 'axios';

export class Request {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public call<T>(method: Method, path: string): Promise<T> {
    return axios[method](this.baseUrl + path).then(({ data }) => data);
  }
}

export default Request;
