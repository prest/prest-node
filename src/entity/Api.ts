import Request from './Request';
import TableConnector from './TableConnector';

export type PRestDatabase = {
  datname: string;
};

export type PRestSchema = {
  schema_name: string;
};

export type PRestTable = {
  schema: string;
  name: string;
  type: string;
  owner: string;
};

export type PRestTableShowItem = {
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

  databases(): Promise<PRestDatabase[]> {
    return this.call<PRestDatabase[]>('get', '/databases');
  }

  schemas(): Promise<PRestSchema[]> {
    return this.call<PRestSchema[]>('get', '/schemas');
  }

  tables(): Promise<PRestTable[]> {
    return this.call<PRestTable[]>('get', '/tables');
  }

  tablesByDBInSchema(...entries: string[]): Promise<PRestTable[]> {
    return this.call<PRestTable[]>('get', `${this.prepareConnectionPath(entries)}`);
  }

  show(...entries: string[]): Promise<PRestTableShowItem[]> {
    return this.call<PRestTableShowItem[]>('get', `/show${this.prepareConnectionPath(entries)}`);
  }

  tableConnection<T>(...entries: string[]): TableConnector<T> {
    return new TableConnector<T>(this.baseUrl, this.prepareConnectionPath(entries));
  }
}

export default Api;
