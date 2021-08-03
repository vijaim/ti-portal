/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux-store/index'
import Routes from './routes'

const logger = createLogger()
let middleware = []
if (process.env.NODE_ENV === 'production') {
  middleware = [...middleware]
} else {
  middleware = [...middleware, logger]
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

ReactDOM.render(
  <Provider store={store}><Routes /></Provider>,
  document.getElementById('root')
)
