import { backendURL } from '../constants';

export const callApi = <T>(method: string, path: string, data?: any): Promise<T[] | null> => {
  return fetch(backendURL + path, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  }).then(res => res.json());
};
