import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import AnecReducer from './reducers/anecdoteReducer'
import FilterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notes: AnecReducer,
    filter: FilterReducer,
    notification: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)