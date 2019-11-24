import { combineReducers } from 'redux'
import auth from './auth/reducers'
import dapps from './dapps/reducers'

const reducers = combineReducers({
  auth,
  dapps,
})

export default reducers
