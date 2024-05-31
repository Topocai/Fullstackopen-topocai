import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({note}) => {
  const dispatch = useDispatch()
  const voteHandler = (id) => dispatch(voteAnecdote(id))
  
  return (
    <article>
      <header>{note.content}</header>
      <footer>
        Has {note.votes} votes
        <button onClick={() => voteHandler(note.id)}>Vote</button>
      </footer>
    </article>
  )
}

export default Anecdote