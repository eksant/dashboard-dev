import store from './store'
// import config from '../config'
import { decrypt } from './util'

// const hostApi = config.api
const pubkey = decrypt(store.get('pubkey'))
const headerOptions = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

async function get(hostapi, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(hostapi, {
    method: 'GET',
    // credentials: 'same-origin',
    headers: headerOptions,
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function post(hostapi, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(hostapi, {
    method: 'POST',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function put(hostapi, payload, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(hostapi, {
    method: 'PUT',
    // credentials: 'same-origin',
    headers: headerOptions,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
}

async function del(hostapi, headerAuth = true) {
  if (headerAuth) {
    headerOptions.Authorization = pubkey
  }

  return fetch(hostapi, {
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
