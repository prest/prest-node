import Request from './Request';
import Query from './Query';

const DEFAULT_COLUMN_ID = 'id';
type MultipleId = string | number;

export class TableConnector<T> extends Request {
  private idColumn: MultipleId;
  private dbPath: string;

  constructor(baseUrl: string, dbPath: string, idColumn: MultipleId = DEFAULT_COLUMN_ID) {
    super({ baseUrl });
    this.dbPath = dbPath;
    this.idColumn = idColumn;
  }

  private formatQuery(entry: MultipleId | Query) {
    const q = entry instanceof Query ? entry : new Query({ $eq: { [this.idColumn]: entry } });
    return q.serialize();
  }

  query(query?: Query): Promise<T[]> {
    const qs = query ? query.serialize() : '';
    return this.call('get', this.dbPath + qs);
  }

  create(data: T): Promise<T> {
    return this.call('post', this.dbPath, data);
  }

  update(entry: MultipleId | Query, data: Partial<T>): Promise<T> {
    const qs = this.formatQuery(entry);
    return this.call('put', this.dbPath + qs, data);
  }

  delete(entry: MultipleId | Query): Promise<T> {
    const qs = this.formatQuery(entry);
    return this.call('delete', this.dbPath + qs);
  }
}

export default TableConnector;
