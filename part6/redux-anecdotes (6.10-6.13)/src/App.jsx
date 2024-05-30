import React from 'react'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  return (
    <main>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
      <button onClick={() => dispatch(setNotification({ message: 'Anecdote created', color: 'green', time: 10000 }))}>asdasd</button>
    </main>
  )
}

export default App