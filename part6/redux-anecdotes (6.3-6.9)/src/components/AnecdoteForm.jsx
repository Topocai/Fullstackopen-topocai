import { useDispatch } from "react-redux"
import { addNote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNoteHandler = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(addNote(content))
    }
    return (
        <form onSubmit={(e) => addNoteHandler(e)}>
            <input type="text" name="anecdote" placeholder="My anecdote text!" />
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm