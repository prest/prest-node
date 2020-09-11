import axios from 'axios';
import * as qs from 'querystring';
import { getOptions } from './store';

const formatURL = (path) => {
  const { baseUrl, ...opts } = getOptions();

  return (baseUrl + path).replace(/{{[^{}]+}}/gi, (m) => {
    return opts[m.replace(/[{}]+/gi, '')] || '';
  });
};

const getResponseData = (promise) => promise.then((response) => response.data);

/**
 * This is a core function that create a request with native http/https module
 */
export const makeRequest = <ResponseType, InputType>(method: string, path: string) => (
  data?: InputType,
): Promise<ResponseType> => {
  const uri = formatURL(path);
  const fn = axios[method];

  if (['post', 'put'].indexOf(method) > -1) {
    return getResponseData(fn(uri, data || {}));
  }

  const qstring = data ? '?' + qs.stringify((data as unknown) as qs.ParsedUrlQueryInput) : '';
  return getResponseData(fn(uri + qstring));
};
