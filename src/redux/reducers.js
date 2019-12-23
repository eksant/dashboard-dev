import { combineReducers } from 'redux'
import auth from './auth/reducers'
import dapps from './dapps/reducers'
import ipfs from './ipfs/reducers'

const reducers = combineReducers({
  auth,
  dapps,
  ipfs,
})

export default reducers
