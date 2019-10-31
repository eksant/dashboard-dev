import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from './actionType';
import { api, store, encrypt } from '../../utils';

const loginLoading = () => ({
  type: LOGIN_LOADING,
});

const loginError = payload => ({
  type: LOGIN_ERROR,
  payload,
});

const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const postLogin = payload => {
  return async dispatch => {
    dispatch(loginLoading());
    try {
      return api
        .post('auth/login', payload, false)
        .then(async resp => {
          const { success, message, data } = resp;
          if (success) {
            dispatch(loginSuccess(data));
            await store.set('user-access', encrypt(data.user));
            await store.set('token-access', data.token_access);
            await store.set('token-expired', data.token_expired);
            if (payload.remember) {
              await store.set('usr', encrypt(payload.email));
              await store.set('pwd', encrypt(payload.password));
            } else {
              await store.remove('usr');
              await store.remove('pwd');
            }
          } else {
            dispatch(loginError(message));
          }
          return Promise.resolve(resp);
        })
        .catch(error => {
          dispatch(loginError(error.message));
          return Promise.reject(error);
        });
    } catch (error) {
      console.error('Error Post Login: ', error);
    }
  };
};
