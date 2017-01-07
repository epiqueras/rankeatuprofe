import fetch from 'isomorphic-fetch';
import Alert from 'react-s-alert';

export default function apiCaller(endpoint, method = 'get', body) {
  return fetch(`/api${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    (error) => { Alert.error('Algo salio mal contactando al servidor'); return error; },
  );
}
