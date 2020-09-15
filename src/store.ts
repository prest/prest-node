const globalOptions: PRestGlobalOptions = {
  baseUrl: 'http://localhost:3000',
};

/**
 * This function create a function that access a private object with PRest client options
 *
 * @param store
 */
export const accessStore = <T>(store: T): AccessStoreFunction<T> => () => store;

/**
 * This function create a function that acting as a getter for a private object
 *
 * @param store
 */
export const getFromStore = <T>(store: T): GetFromStoreFunction<T> => (key) => store[key];

/**
 * This function create a function that acting as a setter for a private object
 *
 * @param store
 */
export const setInStore = <T>(store: T): SetInStoreFunction<T> => (key, value) => (store[key] = value);

/**
 * This function access `globalOptions` object and be able to return the entire object
 *
 * **Example**
 * ```
 *  import { getOptions } from 'prest-node';
 *
 *  const opts = getOptions('requestProtocol');
 *  // opts.requestProtocol
 * ```
 *
 * @function
 */
export const getOptions = accessStore<PRestGlobalOptions>(globalOptions);

/**
 * This function get a property inside `globalOptions` object
 *
 * **Example**
 * ```
 *  import { getOptions } from 'prest-node';
 *
 *  const requestProtocol = getOptions('requestProtocol');
 * ```
 */
export const getOption = getFromStore<PRestGlobalOptions>(globalOptions);

/**
 * This function set a property inside `globalOptions` object
 *
 * **Example**
 * ```
 *  import { setOption } from 'prest-node';
 *
 *  setOption('requestProtocol', 'https');
 * ```
 */
export const setOption = setInStore<PRestGlobalOptions>(globalOptions);
