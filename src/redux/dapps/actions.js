import { api } from '../../utils'
import { DAPPS_FORM, DAPPS_LOADING, DAPPS_ERROR, DAPPS_SUCCESS } from './actionType'

const dappsForm = () => ({
  type: DAPPS_FORM,
})

const dappsLoading = () => ({
  type: DAPPS_LOADING,
})

const dappsError = payload => ({
  type: DAPPS_ERROR,
  payload,
})

const dappsSuccess = payload => ({
  type: DAPPS_SUCCESS,
  payload,
})

export const setNewDapp = () => {
  return dispatch => {
    dispatch(dappsForm())
    try {
      dispatch(dappsSuccess({ skeleton: false }))
    } catch (error) {
      console.error('Error Set New Dapps: ', error)
    }
  }
}

export const setDapp = payload => {
  return dispatch => {
    dispatch(dappsLoading())
    try {
      dispatch(dappsSuccess({ data: payload }))
    } catch (error) {
      console.error('Error Set Dapps: ', error)
    }
  }
}

export const getDapps = (page = 1) => {
  return async dispatch => {
    dispatch(dappsLoading())
    try {
      return api
        .get('dapps')
        .then(resp => {
          const { success, message, data } = resp
          if (success) {
            const datas = data.map((item, idx) => {
              item.key = idx + 1
              return item
            })
            dispatch(dappsSuccess({ datas }))
          } else {
            dispatch(dappsError({ message }))
          }
        })
        .catch(error => {
          dispatch(dappsError({ message: error.message }))
        })
    } catch (error) {
      console.error('Error Get Dapps: ', error)
    }
  }
}

export const getDappById = id => {
  return async dispatch => {
    dispatch(dappsLoading())
    try {
      return api
        .get(`dapps/${id}`)
        .then(resp => {
          const { success, message, data } = resp
          if (success) {
            dispatch(dappsSuccess({ data }))
          } else {
            dispatch(dappsError({ message }))
          }
        })
        .catch(error => {
          dispatch(dappsError({ message: error.message }))
        })
    } catch (error) {
      console.error('Error Get Dapp By ID: ', error)
    }
  }
}

export const createDapp = payload => {
  return dispatch => {
    dispatch(dappsLoading())
    try {
      if (!payload) payload = {}
      return api
        .post('dapps', payload)
        .then(resp => {
          const { success, message, data } = resp
          if (!success) {
            dispatch(dappsError({ message }))
          } else {
            dispatch(dappsSuccess({ data }))
          }
          return Promise.resolve(resp)
        })
        .catch(error => {
          dispatch(dappsError({ message: error }))
          return Promise.reject({ message: error })
        })
    } catch (error) {
      console.error('Error Create Dapp: ', error)
    }
  }
}

export const deleteDapp = id => {
  return () => {
    try {
      return api
        .del(`dapps/${id}`)
        .then(resp => Promise.resolve(resp))
        .catch(error => Promise.reject({ message: error }))
    } catch (error) {
      console.error('Error Delete Dapp: ', error)
    }
  }
}
