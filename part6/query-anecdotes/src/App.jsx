import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll } from './services/anecdotes'

import { voteNote } from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteNote,
    onSuccess: () => queryClient.invalidateQueries(['anecdotes'])
  })

  const anecdotesData = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (anecdotesData.isLoading)
    return (
      <div>
        loading data...
        {
          anecdotesData.failureCount > 0 &&
          <span> Failed, retrying.. attemp {anecdotesData.failureCount}</span>
        }
      </div>
    )

  if (!anecdotesData.isSuccess)
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = anecdotesData.data

  const handleVote = (anecdote) => voteMutation.mutate(anecdote)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
