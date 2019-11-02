import { AUTH_FORM, AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './actionType'
import { gun, store, encrypt } from '../../utils'

const user = gun.user()

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

export const postLogin = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return new Promise(async resolve => {
        const { alias, passphare, remember } = payload

        if (!alias || !passphare) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ success: false, error: true, message })
        }

        if (remember) {
          await store.set('alias', encrypt(alias))
          await store.set('passphare', encrypt(passphare))
        } else {
          await store.remove('alias')
          await store.remove('passphare')
        }

        user.auth(alias, passphare, async ack => {
          if (ack && !ack.err) {
            const data = {
              alias: ack.put.alias,
              epriv: ack.sea.epriv,
              epub: ack.sea.epub,
              priv: ack.sea.priv,
              pub: ack.sea.pub,
            }
            await store.set('pubkey', data.pub)
            dispatch(authSuccess({ data }))
            return resolve({ success: true, error: false, message: 'User login successfully!', data })
          } else {
            await store.remove('pubkey')
            dispatch(authError({ message: ack.err }))
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
    dispatch(authLoading())
    try {
      return new Promise(resolve => {
        const { alias, passphare } = payload

        if (!alias || !passphare) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ success: false, error: true, message })
        }

        user.create(alias, passphare, async ack => {
          if (ack && !ack.err) {
            await store.set('pubkey', encrypt(ack.pub))
            dispatch(authSuccess({ data: ack.pub }))
            return resolve({ success: true, error: false, message: 'User created successfully!', data: ack.pub })
          } else {
            dispatch(authError({ message: ack.err }))
            return resolve({ success: false, error: true, message: ack.err })
          }
        })
      })
    } catch (error) {
      console.error('Error Post Register: ', error)
    }
  }
}

export const postLogout = () => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      user.leave()
      await store.remove('pubkey')
    } catch (error) {
      console.error('Error Post Logout: ', error)
    }
  }
}

export const getAuthUser = () => {
  return dispatch => {
    dispatch(authLoading())
    try {
      const pubkey = store.get('pubkey')

      if (!pubkey) {
        return dispatch(authError({ message: 'User public key not found!' }))
      }

      gun.user(pubkey).once(result => {
        if (!result) return dispatch(authSuccess({ data: null }))
        const data = {
          alias: result.alias,
          epub: result.epub,
          pub: result.pub,
        }
        return dispatch(authSuccess({ data }))
      })
    } catch (error) {
      console.error('Error Get Auth User: ', error)
    }
  }
}
