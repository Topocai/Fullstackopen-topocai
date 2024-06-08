/* eslint-disable react/prop-types */
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { voteNote } from '../services/anecdotes'

import { useNotificationDispatch, setNotification } from "../hooks/notification"
const Anecdote = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const notifyDispatch = useNotificationDispatch()

    const voteMutation = useMutation({
      mutationFn: voteNote,
      onSuccess: () => onSuccessHandle(),
      onError: (error) => notifyDispatch(setNotification(`${error.message}`, 'red', 5))
    })

    const onSuccessHandle = () => {
      queryClient.invalidateQueries(['anecdotes'])
      notifyDispatch(setNotification(`you voted "${anecdote.content}"`, 'green', 5))
    }

    const handleVote = () => voteMutation.mutate(anecdote)
    return (
       <article key={anecdote.id}>
         <hr />
         <header style={{fontWeight: 'bold', fontSize: '1.1em'}}>
           {anecdote.content}
         </header>
         <footer>
           <p>has <span style={{fontWeight: 'bold'}}>{anecdote.votes}</span> votes</p>
           <button onClick={handleVote}>vote</button>
         </footer>
       </article>
    )
}

export default Anecdote
