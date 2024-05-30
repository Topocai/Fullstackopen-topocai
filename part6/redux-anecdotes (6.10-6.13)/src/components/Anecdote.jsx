import React from 'react'

import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({note}) => {
  const dispatch = useDispatch()
  const voteHandler = (id) => {
    dispatch(setNotification({ message: `Anecdote "${note.content}" voted`, color: 'yellow' }))
    dispatch(voteAnecdote(id))
  }
  
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