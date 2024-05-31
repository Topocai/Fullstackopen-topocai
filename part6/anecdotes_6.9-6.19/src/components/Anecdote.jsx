import React from 'react'

import { useDispatch } from "react-redux"
import { voteNote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({note}) => {
  const dispatch = useDispatch()
  const voteHandler = async (id) => {
    dispatch(voteNote(id))
    dispatch(setNotification({ message: `Anecdote "${note.content}" voted`, color: 'white', time: 5 }))
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