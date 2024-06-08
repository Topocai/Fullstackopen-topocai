import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../services/anecdotes"

import { useNotificationDispatch, setNotification } from "../hooks/notification"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyDispatch = useNotificationDispatch()

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => onSuccessHandler(newNote),
    onError: (error) => notifyDispatch(setNotification(`${error.response ? error.response.data.error : error.message}`, 'red', 5))
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(content)
  }

  const onSuccessHandler = (newNote) => {
    const content = newNote.data.content
    queryClient.setQueryData(['anecdotes'], (old) => old.concat(newNote.data))
    notifyDispatch(setNotification(`you created "${content}"`, 'green', 5))
  }

  return (
    <article>
      <h2>Create new</h2>
      <form onSubmit={onCreate}>
        <input name='anecdote' placeholder="My anecdote text!"/>
        <button type="submit">create</button>
      </form>
    </article>
  )
}

export default AnecdoteForm
