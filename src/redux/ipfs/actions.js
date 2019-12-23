import { api } from '../../utils'
import { IPFS_FORM, IPFS_LOADING, IPFS_ERROR, IPFS_SUCCESS } from './actionType'

const ipfsForm = () => ({
  type: IPFS_FORM,
})

const ipfsLoading = () => ({
  type: IPFS_LOADING,
})

const ipfsError = payload => ({
  type: IPFS_ERROR,
  payload,
})

const ipfsSuccess = payload => ({
  type: IPFS_SUCCESS,
  payload,
})

export const setNewIpfs = () => {
  return dispatch => {
    dispatch(ipfsForm())
    try {
      dispatch(ipfsSuccess({ skeleton: false }))
    } catch (error) {
      console.error('Error Set New Ipfs: ', error)
    }
  }
}

export const setIpfs = payload => {
  return dispatch => {
    dispatch(ipfsLoading())
    try {
      dispatch(ipfsSuccess({ data: payload }))
    } catch (error) {
      console.error('Error Set Ipfs: ', error)
    }
  }
}

export const getIpfsByHash = (hash, prevHash = null) => {
  return async dispatch => {
    dispatch(ipfsLoading())
    try {
      return api
        .get(`ipfs/list/${hash}`)
        .then(resp => {
          const { success, message, data } = resp
          if (success) {
            const datas = data
            const rootIpfs = { Hash: prevHash ? prevHash : hash, Name: '..', Type: 0, Size: 0 }
            prevHash && datas.unshift(rootIpfs)

            dispatch(ipfsSuccess({ datas, data: rootIpfs }))
          } else {
            dispatch(ipfsError({ message }))
          }
        })
        .catch(error => {
          dispatch(ipfsError({ message: error.message }))
        })
    } catch (error) {
      console.error('Error Get Ipfs By ID: ', error)
    }
  }
}
