import ReactDOM from 'react-dom/client'

import App from './App'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import AnecReducer from './reducers/anecdoteReducer'
import FilterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: AnecReducer,
  filter: FilterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)