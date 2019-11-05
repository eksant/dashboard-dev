import config from '../config';
import store from './store';

const hostApi = config.hostApi;
const bearerToken = `Bearer ${store.get('token-access')}`;

const upload = (endpoint, name) => ({
  name: name,
  action: `${hostApi}/upload/${endpoint}`,
  headers: { Authorization: bearerToken },
});

export default upload;
