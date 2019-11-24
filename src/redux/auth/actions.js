import { gun, randomPassword, store, encrypt, decrypt } from '../../utils'
import { AUTH_FORM, AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './actionType'

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

      // api.get(`${hostapi.ihub}/users`).then(result => {
      //   const { success, message, data } = result
      //   if (!success) return dispatch(authError({ message }))
      //   return dispatch(authSuccess({ data }))
      // })
    } catch (error) {
      console.error('Error Get Auth User: ', error)
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

        /** create user */
        user.create(email, passphare, ack => {
          if (ack && ack.err) return dispatch(authError({ message: ack.err }))

          /** login user */
          user.auth(email, passphare, ack => {
            if (ack && ack.err) return dispatch(authError({ message: ack.err }))

            /** create profile */
            const data = ack.sea
            const profile = { email, hint, pwd: passphare }
            gun.get(`user/${email}`).put(profile, async ack => {
              if (ack && ack.err) return dispatch(authError({ message: ack.err }))

              await store.set('pubkey', encrypt(data.pub))
              dispatch(authSuccess({ data }))
              return resolve({ success: true, error: false, message: 'User registered successfully!', data })
            })
          })
        })

        // api
        //   .post(`${hostapi.ihub}/auth/register`, payload, false)
        //   .then(async result => {
        //     const { success, message, data } = result
        //     if (!success) return dispatch(authError({ message }))

        //     await store.set('pubkey', encrypt(data.pub))
        //     dispatch(authSuccess({ data }))
        //     return resolve({ success: true, error: false, message: 'User registered successfully!', data })
        //   })
        //   .catch(error => console.error(error))
      })
    } catch (error) {
      console.error('Error Post Register: ', error)
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

        user.auth(email, passphare, async ack => {
          if (ack && ack.err) return dispatch(authError({ message: ack.err }))

          const data = ack.sea
          await store.set('pubkey', encrypt(data.pub))
          dispatch(authSuccess({ data }))
          return resolve({ success: true, error: false, message: 'User login successfully!', data })
        })

        // api
        //   .post(`${hostapi.ihub}/auth/login`, payload, false)
        //   .then(async result => {
        //     const { success, message, data } = result
        //     if (!success) return dispatch(authError({ message }))

        //     await store.set('pubkey', encrypt(data.pub))
        //     dispatch(authSuccess({ data }))
        //     return resolve({ success: true, error: false, message: 'User login successfully!', data })
        //   })
        //   .catch(error => console.error(error))
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
      return new Promise(resolve => {
        const { email, hint } = payload
        if (!email || !hint) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ success: false, error: true, message })
        }

        gun.get(`user/${email}`).once(data => {
          if (!data) {
            const message = 'User not found'
            dispatch(authError({ message }))
            return resolve({ success: false, error: true, message })
          }

          if (data.hint !== hint) {
            const message = 'Incorrect hint'
            dispatch(authError({ message }))
            return resolve({ success: false, error: true, message })
          }

          delete data._
          data.temp = randomPassword()
          gun.get(`user/${email}`).put(data, ack => {
            if (ack && ack.err) return dispatch(authError({ message: ack.err }))

            const result = { email: data.email, hint: data.hint, oldPassphare: data.temp }
            dispatch(authSuccess({ data: result }))
            return resolve({ success: true, error: false, message: null, data: result })
          })
        })
      })

      // return api
      //   .post(`${hostapi.ihub}/auth/forgot`, payload, false)
      //   .then(async result => {
      //     const { success, message, data } = result
      //     if (!success) {
      //       dispatch(authError({ message }))
      //       return Promise.resolve({ success: false, message, data: null })
      //     }

      //     dispatch(authSuccess({ data }))
      //     return Promise.resolve({ success: true, message, data })
      //   })
      //   .catch(error => console.error(error))
    } catch (error) {
      console.error('Error Post Forgot: ', error)
    }
  }
}

export const postReset = payload => {
  return async dispatch => {
    dispatch(authLoading())
    try {
      return new Promise(resolve => {
        const { email, oldPassphare, newPassphare } = payload

        if (!email || !oldPassphare || !newPassphare) {
          const message = 'Invalid payload'
          dispatch(authError({ message }))
          return resolve({ success: false, error: true, message })
        }

        gun.get(`user/${email}`).once(data => {
          if (!data) {
            const message = 'User not found'
            dispatch(authError({ message }))
            return resolve({ success: false, error: true, message })
          }

          if (data.temp !== oldPassphare) {
            const message = 'Incorrect temp password'
            dispatch(authError({ message }))
            return resolve({ success: false, error: true, message })
          }

          user.auth(
            email,
            data.pwd,
            ack => {
              if (ack && ack.err) {
                dispatch(authError({ message: ack.err }))
                return resolve({ success: false, error: true, message: ack.err })
              }

              delete data._
              delete data.temp
              data.pwd = newPassphare
              gun.get(`user/${email}`).put(data, ack => {
                if (ack && ack.err) return dispatch(authError({ message: ack.err }))

                const result = { email: data.email, hint: data.hint }
                dispatch(authSuccess({ data: result }))
                return resolve({ success: true, error: false, message: 'Reset password successfully', data: result })
              })
            },
            { change: newPassphare }
          )
        })
      })

      // return api
      //   .post(`${hostapi.ihub}/auth/reset`, payload, false)
      //   .then(async result => {
      //     const { success, message, data } = result
      //     if (!success) {
      //       dispatch(authError({ message }))
      //       return Promise.resolve({ success: false, message, data: null })
      //     }

      //     dispatch(authSuccess({ data }))
      //     return Promise.resolve({ success: true, message, data })
      //   })
      //   .catch(error => console.error(error))
    } catch (error) {
      console.error('Error Post Reset: ', error)
    }
  }
}

export const postLogout = () => {
  return async () => {
    try {
      user.leave()
      await store.remove('pubkey')
    } catch (error) {
      console.error('Error Post Logout: ', error)
    }
  }
}
