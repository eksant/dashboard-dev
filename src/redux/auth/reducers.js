import { AUTH_LOADING, AUTH_ERROR, AUTH_SUCCESS } from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  data: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.message || null,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: null,
        data: action.payload.data || null,
      }
    default:
      return state
  }
}

export default reducers
