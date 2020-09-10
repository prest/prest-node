import { makeRequest } from '~/http';

describe('src/http', () => {
  describe('makeRequest', () => {
    it('should makeRequest returns 1', () => {
      expect(makeRequest()).toBe(1);
    });
  });
});
