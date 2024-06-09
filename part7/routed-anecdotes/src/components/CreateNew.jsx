/* eslint-disable react/prop-types */
import { useState } from "react"

import { useNotificationDispatch, setNotification } from "../hooks/notification"

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const notifyDispatch = useNotificationDispatch()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    props.updateList(prevData => [...prevData, anecdote])

    notifyDispatch(setNotification(`a new anecdote ${anecdote.content} created!`, 'green', 5))
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
  }
  
  return (
    <article>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create new anecdote</legend>
          <label>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} required/>
          </label>
          <label>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} required/>
          </label>
          <label>
            url for more info
            <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} required/>
          </label>
        </fieldset>
        <button>create</button>
      </form>
    </article>
  )
}

export default CreateNew
