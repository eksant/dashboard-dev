import store from './store'
import config from '../config'
import { decrypt } from './util'

const hostapi = config.api.pfalfa
const pubkey = decrypt(store.get('pubkey'))
const headerOptions = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

async function get(endpoint, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(`${hostapi}/${endpoint}`, {
    method: 'GET',
    // credentials: 'same-origin',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function post(endpoint, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(`${hostapi}/${endpoint}`, {
    method: 'POST',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function put(endpoint, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(`${hostapi}/${endpoint}`, {
    method: 'PUT',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function del(endpoint, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(`${hostapi}/${endpoint}`, {
    method: 'DELETE',
    // credentials: 'same-origin',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

const api = {
  get,
  post,
  put,
  del,
}

export default api
