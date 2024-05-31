import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../services/anecdotes"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => queryClient.setQueryData(['anecdotes'], (old) => old.concat(newNote.data))
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
