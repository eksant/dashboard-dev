import { IPFS_FORM, IPFS_LOADING, IPFS_ERROR, IPFS_SUCCESS } from './actionType'

const initialState = {
  skeleton: false,
  loading: false,
  error: false,
  message: null,
  data: null,
  datas: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case IPFS_FORM:
      return {
        ...state,
        skeleton: true,
        loading: false,
        error: false,
        message: null,
        data: null,
      }
    case IPFS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case IPFS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message || null,
        datas: action.payload.datas || null,
      }
    case IPFS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: null,
        skeleton: action.payload.skeleton || false,
        data: action.payload.data || null,
        datas: action.payload.datas || null,
      }
    default:
      return state
  }
}

export default reducers
