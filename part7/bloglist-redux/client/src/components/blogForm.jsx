import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { postBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const onBlogSubmit = (e) => {
    e.preventDefault()
    dispatch(
      postBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }),
    )
  }

  return (
    <form onSubmit={(e) => onBlogSubmit(e)}>
      <label>
        Title:
        <input
          onChange={(e) => setNewBlogTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </label>
      <label>
        Author:
        <input
          onChange={(e) => setNewBlogAuthor(e.target.value)}
          placeholder="Author"
        />
      </label>
      <label>
        Url:
        <input
          onChange={(e) => setNewBlogUrl(e.target.value)}
          placeholder="Url"
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
