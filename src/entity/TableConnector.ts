import Request from './Request';

const DEFAULT_COLUMN_ID = 'id';
type MultipleId = string | number;

export class TableConnector<T> extends Request {
  private idColumn: MultipleId;
  private dbPath: string;

  constructor(baseUrl: string, dbPath: string, idColumn: MultipleId = DEFAULT_COLUMN_ID) {
    super(baseUrl);
    this.dbPath = dbPath;
    this.idColumn = idColumn;
  }

  query(): Promise<T[]> {
    return this.call('get', this.dbPath);
  }

  create(data: T): Promise<T> {
    return this.call('post', this.dbPath, data);
  }

  update(id: MultipleId, data: Partial<T>): Promise<T> {
    return this.call('patch', `${this.dbPath}?${this.idColumn}=${id}`, data);
  }

  delete(id: MultipleId): Promise<T> {
    return this.call('delete', `${this.dbPath}?${this.idColumn}=${id}`);
  }
}

export default TableConnector;
