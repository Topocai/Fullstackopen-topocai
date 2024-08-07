import React, { useState } from 'react'

import { useBlogs } from '../hooks'

import ToggeableComponent from './toggleable'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [blogResource, blogMutations] = useBlogs()

  return (
    <ToggeableComponent hideLabel="cancel" showLabel="create">
      <form
        className="spawn-container"
        onSubmit={(e) =>
          blogMutations.onAddBlogHandler(e, {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
          })
        }
      >
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
    </ToggeableComponent>
  )
}

export default BlogForm
