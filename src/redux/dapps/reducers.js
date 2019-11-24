import { DAPPS_FORM, DAPPS_LOADING, DAPPS_ERROR, DAPPS_SUCCESS } from './actionType'

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
    case DAPPS_FORM:
      return {
        ...state,
        skeleton: true,
        loading: false,
        error: false,
        message: null,
        data: null,
      }
    case DAPPS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case DAPPS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message || null,
      }
    case DAPPS_SUCCESS:
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
