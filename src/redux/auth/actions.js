import { AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './actionType'
import { gun, store, encrypt } from '../../utils'

const user = gun.user()

const loginLoading = () => ({
  type: AUTH_LOADING,
})

const loginError = payload => ({
  type: AUTH_ERROR,
  payload,
})

const loginSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload,
})

export const postLogin = payload => {
  return async dispatch => {
    dispatch(loginLoading())
    try {
      return new Promise(async resolve => {
        const { alias, passphare, remember } = payload

        if (!alias || !passphare) {
          const message = 'Invalid payload'
          dispatch(loginError({ message }))
          return resolve({ success: false, error: true, message })
        }

        if (remember) {
          await store.set('alias', encrypt(alias))
          await store.set('passphare', encrypt(passphare))
        } else {
          await store.remove('alias')
          await store.remove('passphare')
        }

        user.auth(alias, passphare, ack => {
          if (ack && !ack.err) {
            const data = {
              alias: ack.put.alias,
              epriv: ack.sea.epriv,
              epub: ack.sea.epub,
              priv: ack.sea.priv,
              pub: ack.sea.pub,
            }
            dispatch(loginSuccess({ data }))
            return resolve({ success: true, error: false, message: 'User login successfully!', data })
          } else {
            dispatch(loginError({ message: ack.err }))
            return resolve({ success: false, error: true, message: ack.err })
          }
        })
      })
    } catch (error) {
      console.error('Error Post Login: ', error)
    }
  }
}

export const postRegister = payload => {
  return async dispatch => {
    dispatch(loginLoading())
    try {
      return new Promise(resolve => {
        const { alias, passphare } = payload

        if (!alias || !passphare) {
          const message = 'Invalid payload'
          dispatch(loginError({ message }))
          return resolve({ success: false, error: true, message })
        }

        user.create(alias, passphare, async ack => {
          if (ack && !ack.err) {
            await store.set('pubkey', encrypt(ack.pub))
            dispatch(loginSuccess({ data: ack.pub }))
            return resolve({ success: true, error: false, message: 'User created successfully!', data: ack.pub })
          } else {
            dispatch(loginError({ message: ack.err }))
            return resolve({ success: false, error: true, message: ack.err })
          }
        })
      })
    } catch (error) {
      console.error('Error Post Register: ', error)
    }
  }
}
