type PRestGlobalOptions = {
  baseUrl: string;
  db?: string;
  schema?: string;
};

type AccessStoreFunction<T> = () => T;
type GetFromStoreFunction<T> = (x: keyof T) => T[keyof T];
type SetInStoreFunction<T> = (x: keyof T, y: T[keyof T]) => T[keyof T];
