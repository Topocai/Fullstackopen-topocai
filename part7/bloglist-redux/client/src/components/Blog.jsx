import React from 'react'
import PropTypes from 'prop-types'

import ToggeableComponent from './toggleable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, loggedUserId, onLikeHandler, onRemoveHandler }) => {
  return (
    <div style={blogStyle} className="blog-container">
      {blog.title}
      <ToggeableComponent hideLabel="hide" showLabel="view">
        <a href={blog.url}>
          <p>{blog.url}</p>
        </a>
        <p>
          {blog.likes} likes{' '}
          <button id="like-button" onClick={(e) => onLikeHandler(e)}>
            Like
          </button>
        </p>
        <p>~ {blog.author}</p>

        {loggedUserId === (blog.user.id || blog.user) && (
          <button onClick={(e) => onRemoveHandler(e)}>Remove</button>
        )}
      </ToggeableComponent>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  onLikeHandler: PropTypes.func.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
}

export default Blog
