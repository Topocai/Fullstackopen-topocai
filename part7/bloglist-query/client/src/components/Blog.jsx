import React from 'react'
import PropTypes from 'prop-types'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  borderWidth: 1,
  marginBottom: 5,
  width: '60vw',
}

const Blog = ({
  blog,
  loggedUserId,
  onLikeHandler,
  onRemoveHandler,
  onCommentHandler,
}) => {
  const [newComment, setNewComment] = useState('')
  return (
    <article style={blogStyle} className="blog-container spawn-container">
      <Link className="url" to="/blogs">
        Blog List
      </Link>
      <h3>"{blog.title}"</h3>
      <p className="url">
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <div>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
        <p style={{ fontWeight: 'bold' }}>{blog.likes} likes </p>
      </div>

      <footer>
        <div className="blog-inputs">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comment blog post"
          />
          <button id="like-button" onClick={(e) => onLikeHandler(e, blog)}>
            Like
          </button>
          <button onClick={(e) => onCommentHandler(e, blog.id, newComment)}>
            Comment
          </button>

          {loggedUserId !== undefined &&
            loggedUserId === (blog.user.id || blog.user) && (
              <button onClick={(e) => onRemoveHandler(e, blog.id)}>
                Remove
              </button>
            )}
        </div>

        <span>~ {blog.author}</span>
      </footer>
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  onLikeHandler: PropTypes.func.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
  onCommentHandler: PropTypes.func.isRequired,
}

export default Blog
