import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatchHandler = (type) => store.dispatch({type})

  const getStoreProperty = (prop) => store.getState()[prop]

  return (
    <div>
      <button onClick={() => dispatchHandler('GOOD')}>good</button> 
      <button onClick={() => dispatchHandler('OK')}>ok</button> 
      <button onClick={() => dispatchHandler('BAD')}>bad</button>
      <button onClick={() => dispatchHandler('ZERO')}>reset stats</button>
      <div>good {getStoreProperty('good')}</div>
      <div>ok {getStoreProperty('ok')}</div>
      <div>bad {getStoreProperty('bad')}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
