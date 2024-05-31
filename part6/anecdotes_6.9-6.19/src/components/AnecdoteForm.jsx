import React from 'react'

import { useDispatch } from "react-redux"
import { postNote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNoteHandler = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(postNote(content))
      dispatch(setNotification({ message: `Anecdote "${content}" created`, color: 'green', time: 10 }))
    }
    return (
        <form onSubmit={(e) => addNoteHandler(e)}>
            <input type="text" name="anecdote" placeholder="My anecdote text!" />
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm