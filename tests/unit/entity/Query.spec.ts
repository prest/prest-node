import Query from '~/entity/Query';

describe('entity/Query', () => {
  const field1 = 'foo';
  const field2 = 'fizz';
  const val1 = 'bar';
  const val2 = 'fuzz';
  const val3 = 1;

  const filter1 = '$eq';
  const filter2 = '_page';

  describe('.inject/.injectSimpleFilter/.getFilters', () => {
    it('should inject a filter inside Query', () => {
      const q = new Query();
      q.inject(filter1, field1, val1);

      expect(q.getFilters()).toHaveProperty(`${filter1}.${field1}`, val1);
    });

    it('should inject twice a filter inside Query', () => {
      const q = new Query();
      q.inject(filter1, field1, val1);
      q.inject(filter1, field2, val2);

      expect(q.getFilters()).toHaveProperty(`${filter1}.${field1}`, val1);
      expect(q.getFilters()).toHaveProperty(`${filter1}.${field2}`, val2);
    });

    it('should inject a simple filter', () => {
      const q = new Query();
      q.injectSimpleFilter(filter2, val1);
      expect(q.getFilters()).toHaveProperty(filter2, val1);
    });

    it('should inject a simple filter and a complex one', () => {
      const q = new Query();
      q.injectSimpleFilter(filter2, val1);
      q.inject('$eq', 'fizz', val2);

      expect(q.getFilters()).toHaveProperty(filter2, val1);
      expect(q.getFilters()).toHaveProperty('$eq.fizz', val2);
    });
  });

  describe('.serialize()', () => {
    it('should serialize an empty array', () => {
      const q = new Query();
      expect(q.serialize()).toBe('');
    });

    it('should serialize a single value query', () => {
      const q = new Query({ [filter1]: { [field1]: val1 } });
      expect(q.serialize()).toBe(`?${field1}=${filter1}.${val1}`);
    });

    it('should serialize a multiple value query in same filter', () => {
      const q = new Query({ [filter1]: { [field1]: val1, [field2]: val2 } });
      expect(q.serialize()).toBe(`?${field1}=${filter1}.${val1}&${field2}=${filter1}.${val2}`);
    });

    it('should serialize a multiple value query in diferent filter', () => {
      const customFilter = '$gt';
      const q = new Query({ [filter1]: { [field1]: val1 }, [customFilter]: { [field2]: val2 } });
      expect(q.serialize()).toBe(`?${field1}=${filter1}.${val1}&${field2}=${customFilter}.${val2}`);
    });

    it('should serialize a single simple value', () => {
      const q = new Query({ [filter2]: val3 });
      expect(q.serialize()).toBe(`?${filter2}=${val3}`);
    });

    it('should serialize a simple value and a complex one', () => {
      const q = new Query({ [filter1]: { [field1]: val1 }, [filter2]: val3 });
      expect(q.serialize()).toBe(`?${field1}=${filter1}.${val1}&${filter2}=${val3}`);
    });
  });

  describe('.pagination()', () => {
    it('should execute the method with success', () => {
      const q = new Query();
      const val4 = 5;
      jest.spyOn(q, 'page');
      jest.spyOn(q, 'pageSize');

      q.pagination(val3, val4);
      expect(q.page).toHaveBeenCalledTimes(1);
      expect(q.pageSize).toHaveBeenCalledTimes(1);
      expect(q.page).toHaveBeenCalledWith(val3);
      expect(q.pageSize).toHaveBeenCalledWith(val4);

      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
  });

  describe('Simple Filters Methods', () => {
    let q;

    beforeEach(() => {
      q = new Query();
      jest.spyOn(q, 'injectSimpleFilter');
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    [
      { method: 'page', op: '_page' },
      { method: 'pageSize', op: '_page_size' },
      { method: 'count', op: '_count' },
      { method: 'rendered', op: '_rendered' },
    ].forEach(({ method, op }) => {
      it(`should exec .${method} with success`, () => {
        q[method](val1);
        expect(q.injectSimpleFilter).toHaveBeenCalledTimes(1);
        expect(q.injectSimpleFilter).toHaveBeenCalledWith(op, val1);
      });
    });
  });

  describe('Complex Filters Methods', () => {
    let q;

    beforeEach(() => {
      q = new Query();
      jest.spyOn(q, 'inject');
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    [
      'eq',
      'gt',
      'gte',
      'lt',
      'lte',
      'ne',
      'in',
      'nin',
      'null',
      'notnull',
      'true',
      'nottrue',
      'false',
      'notfalse',
      'like',
      'ilike',
    ].forEach((method) => {
      it(`should exec .${method} with success`, () => {
        q[method](field1, val1);
        expect(q.inject).toHaveBeenCalledTimes(1);
        expect(q.inject).toHaveBeenCalledWith(`$${method}`, field1, val1);
      });
    });
  });
});
