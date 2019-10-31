import { notification, message } from 'antd';
import store from './store';
import config from '../config';

message.config({ top: 110 });

var api = {
  get,
  post,
  put,
  del,
};

const hostApi = config.hostApi;
const bearerToken = `Bearer ${store.get('token-access')}`;
const headerOptions = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

const validateToken = async resp => {
  if (resp.status !== undefined) {
    if (resp.status > 400 && resp.status < 500) {
      await store.remove('token-access');
      await store.remove('token-expired');
      await store.remove('user-access');

      notification['warning']({
        message: resp.status === 401 ? 'User Authentication' : 'User Session',
        description: resp.message,
        style: { top: '30px' },
      });

      setTimeout(() => {
        if (resp.status === 401 || resp.status === 403) {
          window.location.href = '/login';
        }
      }, 2000);

      return null;
    } else if (resp.status === 500) {
      // window.location.href = '/page-500'
      return null;
    }
  }
  return resp;
};

async function get(endpoint, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = bearerToken;
  }

  return fetch(`${hostApi}/${endpoint}`, {
    method: 'GET',
    // credentials: 'same-origin',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(async data => await validateToken(data))
    .catch(error => error);
}

async function post(endpoint, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = bearerToken;
  }

  return fetch(`${hostApi}/${endpoint}`, {
    method: 'POST',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(async data => await validateToken(data))
    .catch(error => error);
}

async function put(endpoint, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = bearerToken;
  }

  return fetch(`${hostApi}/${endpoint}`, {
    method: 'PUT',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(async data => await validateToken(data))
    .catch(error => error);
}

async function del(endpoint, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = bearerToken;
  }

  return fetch(`${hostApi}/${endpoint}`, {
    method: 'DELETE',
    // credentials: 'same-origin',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(async data => await validateToken(data))
    .catch(error => error);
}

export default api;
