import { createStore, applyMiddleware } from 'redux'
import ThunkMiddleware                  from 'redux-thunk'

import Reducers                         from './Reducers'

const middlewares = [
    ThunkMiddleware
]

const isProduction = false

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    Reducers
  , !isProduction && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  , applyMiddleware( ...middlewares )
)

export default store
