import Request from './Request';
import TableConnector from './TableConnector';

type Database = {
  datname: string;
};

type Schema = {
  schema_name: string;
};

type Table = {
  schema: string;
  name: string;
  type: string;
  owner: string;
};

type TableDescriptionItem = {
  table_schema: string;
  table_name: string;
  position: number;
  column_name: string;
  data_type: string;
  max_length: number;
  is_nullable: string;
  is_generated: string;
  is_updatable: string;
  default_value: string;
};

export class Api extends Request {
  private prepareConnectionPath(entries: string[]) {
    return '/' + (entries.length === 1 ? entries[0].replace(/\./g, '/') : entries.join('/'));
  }

  databases(): Promise<Database[]> {
    return this.call<Database[]>('get', '/databases');
  }

  schemas(): Promise<Schema[]> {
    return this.call<Schema[]>('get', '/schemas');
  }

  tables(): Promise<Table[]> {
    return this.call<Table[]>('get', '/tables');
  }

  tablesByDBInSchema(...entries: string[]): Promise<Table[]> {
    return this.call<Table[]>('get', `${this.prepareConnectionPath(entries)}`);
  }

  show(...entries: string[]): Promise<TableDescriptionItem[]> {
    return this.call<TableDescriptionItem[]>('get', `/show${this.prepareConnectionPath(entries)}`);
  }

  tableConnection<T>(...entries: string[]): TableConnector<T> {
    return new TableConnector<T>(this.baseUrl, this.prepareConnectionPath(entries));
  }
}

export default Api;
