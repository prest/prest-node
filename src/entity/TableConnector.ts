import Request from './Request';

export class TableConnector<T> extends Request {
  private dbPath: string;

  constructor(baseUrl: string, dbPath: string) {
    super(baseUrl);
    this.dbPath = dbPath;
  }

  query(): Promise<T[]> {
    return this.call('get', this.dbPath);
  }
}

export default TableConnector;
