/* eslint-disable react/prop-types */
import { useState } from "react"

import { useField } from '../hooks'

import { useNotificationDispatch, setNotification } from "../hooks/notification"

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const notifyDispatch = useNotificationDispatch()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    props.updateList(prevData => [...prevData, anecdote])

    notifyDispatch(setNotification(`a new anecdote ${anecdote.content} created!`, 'green', 5))
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    e.target.value = ''
    content.onChange(e)
    author.onChange(e)
    info.onChange(e)
  }
  
  return (
    <article>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Create new anecdote</legend>
          <label>
            content
            <input name='content' {...content} required/>
          </label>
          <label>
            author
            <input name='author' {...author} required/>
          </label>
          <label>
            url for more info
            <input name='info' {...info} required/>
          </label>
        </fieldset>
        <button>create</button>
        <button onClick={(e) => handleReset(e)}>reset</button>
      </form>
    </article>
  )
}

export default CreateNew
