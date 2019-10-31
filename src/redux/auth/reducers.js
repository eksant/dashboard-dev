import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from './actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  data: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: null,
        data: action.payload,
      }
    default:
      return state
  }
}

export default reducers
