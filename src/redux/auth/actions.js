import config from '../../config'
import { api, store, encrypt, decrypt } from '../../utils'
import { AUTH_FORM, AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './actionType'

const hostapi = config.api

const authForm = () => ({
  type: AUTH_FORM,
})

const authLoading = () => ({
  type: AUTH_LOADING,
})

const authError = payload => ({
  type: AUTH_ERROR,
  payload,
})

const authSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload,
})

export const setNewAuth = () => {
  return dispatch => {
    dispatch(authForm())
    try {
      dispatch(authSuccess({ skeleton: false }))
    } catch (error) {
      console.error('Error Set New Auth: ', error)
    }
  }
}

export const setAuth = payload => {
  return dispatch => {
    dispatch(authLoading())
    try {
      dispatch(authSuccess({ data: payload }))
    } catch (error) {
      console.error('Error Set Auth: ', error)
    }
  }
}

export const getAuthUser = () => {
  return dispatch => {
    dispatch(authLoading())
    try {
      const pubkey = decrypt(store.get('pubkey'))
      if (!pubkey) return dispatch(authError({ message: 'User public key not found!' }))

      api.get(`${hostapi.ihub}/users`).then(result => {
        const { success, message, data } = result
        if (!success) return dispatch(authError({ message }))
        return dispatch(authSuccess({ data }))
      })
    } catch (error) {
      console.error('Error Get Auth User: ', error)
    }
  }
}

export const postLogin = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return new Promise(async resolve => {
        const { email, passphare, remember } = payload

        if (!email || !passphare) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ success: false, error: true, message })
        }

        if (remember) {
          await store.set('email', encrypt(email))
          await store.set('passphare', encrypt(passphare))
        } else {
          await store.remove('email')
          await store.remove('passphare')
        }

        api
          .post(`${hostapi.ihub}/auth/login`, payload, false)
          .then(async result => {
            const { success, message, data } = result
            if (!success) return dispatch(authError({ message }))

            await store.set('pubkey', encrypt(data.pub))
            dispatch(authSuccess({ data }))
            return resolve({ success: true, error: false, message: 'User login successfully!', data })
          })
          .catch(error => console.error(error))
      })
    } catch (error) {
      console.error('Error Post Login: ', error)
    }
  }
}

export const postForgot = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return api
        .post(`${hostapi.ihub}/auth/forgot`, payload, false)
        .then(async result => {
          const { success, message, data } = result
          if (!success) {
            dispatch(authError({ message }))
            return Promise.resolve({ success: false, message, data: null })
          }

          dispatch(authSuccess({ data }))
          return Promise.resolve({ success: true, message, data })
        })
        .catch(error => console.error(error))
    } catch (error) {
      console.error('Error Post Forgot: ', error)
    }
  }
}

export const postReset = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return api
        .post(`${hostapi.ihub}/auth/reset`, payload, false)
        .then(async result => {
          const { success, message, data } = result
          if (!success) {
            dispatch(authError({ message }))
            return Promise.resolve({ success: false, message, data: null })
          }

          dispatch(authSuccess({ data }))
          return Promise.resolve({ success: true, message, data })
        })
        .catch(error => console.error(error))
    } catch (error) {
      console.error('Error Post Reset: ', error)
    }
  }
}

export const postRegister = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return new Promise(async resolve => {
        const { email, passphare, confPassphare, hint } = payload

        if (!email || !passphare || !confPassphare || !hint) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ error: true, message })
        }

        if (passphare !== confPassphare) {
          const message = 'Passwords does not match'
          dispatch(authError({ message }))
          return resolve({ error: true, message })
        }

        api
          .post(`${hostapi.ihub}/auth/register`, payload, false)
          .then(async result => {
            const { success, message, data } = result
            if (!success) return dispatch(authError({ message }))

            await store.set('pubkey', encrypt(data.pub))
            dispatch(authSuccess({ data }))
            return resolve({ success: true, error: false, message: 'User registered successfully!', data })
          })
          .catch(error => console.error(error))
      })
    } catch (error) {
      console.error('Error Post Register: ', error)
    }
  }
}

export const postLogout = () => {
  return async () => {
    try {
      await store.remove('pubkey')
    } catch (error) {
      console.error('Error Post Logout: ', error)
    }
  }
}
