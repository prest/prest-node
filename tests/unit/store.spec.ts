import { accessStore, getFromStore, setInStore } from '~/store';

describe('src/store', () => {
  const requestProtocol = 'http';
  const opts: PRestGlobalOptions = { requestProtocol };

  describe('accessStore', () => {
    it('should acessStore for options', () => {
      const getter = accessStore(opts);
      expect(getter()).toEqual(opts);
    });
  });

  describe('getFromStore', () => {
    it('should get a single parameter from options store', () => {
      const getter = getFromStore(opts);
      expect(getter('requestProtocol')).toBe(requestProtocol);
    });
  });

  describe('setInStore', () => {
    it('should get a single parameter from options store', () => {
      const setter = setInStore(opts);
      const newVal = 'https';

      expect(setter('requestProtocol', newVal)).toBe(newVal);
      expect(opts).toHaveProperty('requestProtocol', newVal);
    });
  });

  describe('setInStore', () => {
    it('should get a single parameter from options store', () => {
      const setter = setInStore(opts);
      const newVal = 'https';

      expect(setter('requestProtocol', newVal)).toBe(newVal);
      expect(opts).toHaveProperty('requestProtocol', newVal);
    });
  });
});
