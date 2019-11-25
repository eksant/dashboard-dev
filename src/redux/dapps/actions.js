import config from '../../config'
import { api } from '../../utils'
import { DAPPS_FORM, DAPPS_LOADING, DAPPS_ERROR, DAPPS_SUCCESS } from './actionType'

const hostapi = config.api

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
        .get(`${hostapi.dapps}/dapps/containers`)
        .then(datas => {
          console.log('==datas', datas)

          dispatch(dappsSuccess({ datas }))
        })
        .catch(error => {
          dispatch(dappsError(error.message))
        })
    } catch (error) {
      console.error('Error Get Dapps: ', error)
    }
  }
}

export const getDappById = id => {
  return async dispatch => {
    dispatch(dappsForm())
    try {
      return api
        .get(`${hostapi.dapps}/dapps/containers`)
        .then(async resp => {
          const { success, message, data } = resp

          if (success) {
            dispatch(dappsSuccess({ data }))
          } else {
            dispatch(dappsError(message))
          }
        })
        .catch(error => {
          dispatch(dappsError(error.message))
        })
    } catch (error) {
      console.error('Error Get Dapp: ', error)
    }
  }
}

export const createDapp = payload => {
  return async dispatch => {
    dispatch(dappsLoading())
    try {
      return api
        .post(`${hostapi.dapps}/dapps/create`, payload)
        .then(resp => {
          dispatch(dappsSuccess({ loading: false }))
          return Promise.resolve(resp)
        })
        .catch(error => {
          dispatch(dappsError(error.message))
          return Promise.reject(error.message)
        })
    } catch (error) {
      console.error('Error Create Dapps: ', error)
    }
  }
}

export const updateDapp = (id, payload) => {
  return async dispatch => {
    dispatch(dappsLoading())
    try {
      return api
        .put(`${hostapi.dapps}/dapps/create`, payload)
        .then(resp => {
          dispatch(dappsSuccess({ loading: false }))
          return Promise.resolve(resp)
        })
        .catch(error => {
          dispatch(dappsError(error.message))
          return Promise.reject(error.message)
        })
    } catch (error) {
      console.error('Error Update Dapps: ', error)
    }
  }
}

export const deleteDapp = id => {
  return async dispatch => {
    dispatch(dappsLoading())
    try {
      return api
        .del(`${hostapi.dapps}/dapps/create`)
        .then(resp => {
          dispatch(dappsSuccess({ loading: false }))
          return Promise.resolve(resp)
        })
        .catch(error => {
          dispatch(dappsError(error.message))
          return Promise.reject(error.message)
        })
    } catch (error) {
      console.error('Error Delete Dapps: ', error)
    }
  }
}
