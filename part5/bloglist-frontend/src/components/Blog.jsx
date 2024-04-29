import ToggeableComponent from './toggleable'
import blogServices from '../services/blogs'

import React from 'react'

import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, refreshBlogs, loggedUser }) => {
  const likeHandler = async (event) => {
    event.preventDefault()
    const likeButton = document.getElementById('like-button')
    likeButton.disabled = true
    try {
      await blogServices.likeBlog(blog.id, { likes: blog.likes + 1 })
      await refreshBlogs()
      likeButton.disabled = false
    } catch {
      console.log('error in like')
    }
  }

  const removeHandler = async (event) => {
    event.preventDefault()
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      try {
        await blogServices.removeBlog(blog.id)

        refreshBlogs()
      } catch {
        console.log('error in remove')
      }
    }
  }

  return (
    <div style={blogStyle} className='blog-container'>
      {blog.title}
      <ToggeableComponent hideLabel='hide' showLabel='view'>
        <a href={blog.url}><p>{blog.url}</p></a>
        <p>{blog.likes} likes <button id='like-button' onClick={(e) => likeHandler(e)}>Like</button></p>
        <p>~ {blog.author}</p>

        {
          loggedUser === (blog.user.id || blog.user) && <button onClick={(e) => removeHandler(e)}>Remove</button> // Edited for only shows if its your blog in 5.22
        }
      </ToggeableComponent>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  refreshBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired
}

export default Blog
