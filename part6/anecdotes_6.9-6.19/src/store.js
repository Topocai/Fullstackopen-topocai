import { configureStore } from '@reduxjs/toolkit'

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

export default store
