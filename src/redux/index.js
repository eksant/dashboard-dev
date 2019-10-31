import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const redux = createStore(reducers, applyMiddleware(thunk))

export default redux
