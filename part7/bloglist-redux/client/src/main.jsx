import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import blogsReducer from './reducers/blogsReducer.js'
import userReducer from './reducers/userReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notify: notificationReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
