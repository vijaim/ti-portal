/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux-store/index'
import Routes from './routes'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))

ReactDOM.render(
  <Provider store={store}><Routes /></Provider>,
  document.getElementById('root')
)
