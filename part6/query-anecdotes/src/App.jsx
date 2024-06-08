import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotesStatus } from './hooks/useNotesStatus'
import Anecdote from './components/Anecdote'

import { NotificationProvider } from './hooks/notification'


const App = () => {
  const anecdotesData = useNotesStatus()
  const anecdotes = anecdotesData.data

  if(anecdotesData.errorContent) return anecdotesData.errorContent

  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0 10vw 0 10vw',
  }

  return (
    <main style={style}>
      <h1>Anecdote app</h1>
      <NotificationProvider>
        <Notification />
        <AnecdoteForm />
        <h2>Notes</h2>
        {anecdotes.map(anecdote =>
          <Anecdote anecdote={anecdote} key={anecdote.id} />
        )}
      </NotificationProvider>
    </main>
  )
}

export default App
