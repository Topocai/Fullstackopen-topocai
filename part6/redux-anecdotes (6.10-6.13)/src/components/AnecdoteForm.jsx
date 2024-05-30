import React from 'react'

import { useDispatch } from "react-redux"
import { addNote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNoteHandler = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(addNote(content))
      dispatch(setNotification({ message: `Anecdote "${content}" created`, color: 'green', time: 10000 }))
    }
    return (
        <form onSubmit={(e) => addNoteHandler(e)}>
            <input type="text" name="anecdote" placeholder="My anecdote text!" />
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm