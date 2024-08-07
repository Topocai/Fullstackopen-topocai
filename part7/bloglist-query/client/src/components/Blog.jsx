import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  borderWidth: 1,
  marginBottom: 5,
  width: '60vw',
}

const Blog = ({ blog, loggedUserId, onLikeHandler, onRemoveHandler }) => {
  return (
    <article style={blogStyle} className="blog-container">
      <Link to="/blogs">Blog List</Link>
      <h3>"{blog.title}"</h3>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button id="like-button" onClick={(e) => onLikeHandler(e, blog)}>
          Like
        </button>
      </p>
      <p>~ {blog.author}</p>
      {loggedUserId !== undefined &&
        loggedUserId === (blog.user.id || blog.user) && (
          <button onClick={(e) => onRemoveHandler(e, blog.id)}>Remove</button>
        )}
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  onLikeHandler: PropTypes.func.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
}

export default Blog
