type HttpProtocol = 'http' | 'https';

type PRestGlobalOptions = {
  requestProtocol: HttpProtocol;
};

type AccessStoreFunction<T> = () => T;
type GetFromStoreFunction<T> = (x: keyof T) => T[keyof T];
type SetInStoreFunction<T> = (x: keyof T, y: T[keyof T]) => T[keyof T];
