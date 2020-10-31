type GenericValue = string | number | boolean;
type GenericFilterValue = GenericValue | GenericValue[];
type SimpleFilter = '_page' | '_page_size' | '_rendered' | '_count' | '_select';
type Filters =
  | SimpleFilter
  | '$eq'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$ne'
  | '$in'
  | '$nin'
  | '$null'
  | '$notnull'
  | '$true'
  | '$nottrue'
  | '$false'
  | '$notfalse'
  | '$like'
  | '$ilike';
type FilterStructure = Record<string, GenericFilterValue>;
type QueryFilter = Partial<Record<Filters, FilterStructure | GenericFilterValue>>;
type RederedTypes = 'json' | 'xml';

export class Query {
  private filters: QueryFilter;
  private fieldsWithSimpleSerialize = ['_page'];

  constructor(initialFilters: QueryFilter = {}) {
    this.filters = initialFilters;
  }

  private serializeField(field: Filters, value: GenericFilterValue): string {
    return `${field}=${value}`;
  }

  private serializeFieldWithCondition(field: string, cond: Filters, value: GenericFilterValue): string {
    return `${field}=${cond}.${value}`;
  }

  getFilters(): QueryFilter {
    return { ...this.filters };
  }

  injectSimpleFilter(filter: SimpleFilter, value: GenericFilterValue): Query {
    this.filters[filter] = value;
    return this;
  }

  inject(filter: Filters, field: string, value: GenericFilterValue): Query {
    if (!this.filters[filter]) {
      this.filters[filter] = {};
    }

    this.filters[filter][field] = value;
    return this;
  }

  eq(field: string, value: GenericFilterValue): Query {
    return this.inject('$eq', field, value);
  }

  gt(field: string, value: GenericFilterValue): Query {
    return this.inject('$gt', field, value);
  }

  gte(field: string, value: GenericFilterValue): Query {
    return this.inject('$gte', field, value);
  }

  lt(field: string, value: GenericFilterValue): Query {
    return this.inject('$lt', field, value);
  }

  lte(field: string, value: GenericFilterValue): Query {
    return this.inject('$lte', field, value);
  }

  ne(field: string, value: GenericFilterValue): Query {
    return this.inject('$ne', field, value);
  }

  in(field: string, value: GenericFilterValue): Query {
    return this.inject('$in', field, value);
  }

  nin(field: string, value: GenericFilterValue): Query {
    return this.inject('$nin', field, value);
  }

  null(field: string, value: GenericFilterValue): Query {
    return this.inject('$null', field, value);
  }

  notnull(field: string, value: GenericFilterValue): Query {
    return this.inject('$notnull', field, value);
  }

  true(field: string, value: GenericFilterValue): Query {
    return this.inject('$true', field, value);
  }

  nottrue(field: string, value: GenericFilterValue): Query {
    return this.inject('$nottrue', field, value);
  }

  false(field: string, value: GenericFilterValue): Query {
    return this.inject('$false', field, value);
  }

  notfalse(field: string, value: GenericFilterValue): Query {
    return this.inject('$notfalse', field, value);
  }

  like(field: string, value: GenericFilterValue): Query {
    return this.inject('$like', field, value);
  }

  ilike(field: string, value: GenericFilterValue): Query {
    return this.inject('$ilike', field, value);
  }

  page(page: number): Query {
    return this.injectSimpleFilter('_page', page);
  }

  pageSize(pageSize: number): Query {
    return this.injectSimpleFilter('_page_size', pageSize);
  }

  count(column: string): Query {
    return this.injectSimpleFilter('_count', column);
  }

  rendered(redered: RederedTypes): Query {
    return this.injectSimpleFilter('_rendered', redered);
  }

  pagination(page: number, pageSize: number): Query {
    return this.page(page).pageSize(pageSize);
  }

  serialize(): string {
    const serializedString = Object.keys(this.filters)
      .map((filterOp: Filters) => {
        return this.fieldsWithSimpleSerialize.indexOf(filterOp) > -1
          ? this.serializeField(filterOp, this.filters[filterOp] as GenericFilterValue)
          : Object.keys(this.filters[filterOp])
              .map((key) => {
                return this.serializeFieldWithCondition(key, filterOp, this.filters[filterOp][key]);
              })
              .join('&');
      })
      .join('&');

    return serializedString ? `?${serializedString}` : '';
  }
}

export default Query;
