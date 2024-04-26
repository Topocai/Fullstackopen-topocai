import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PostBlog = ({ onBlogPost }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  return (
      <form onSubmit={(e) => onBlogPost(e, { newBlogTitle, newBlogAuthor, newBlogUrl })}>
       <label>Title:
           <input onChange={(e) => setNewBlogTitle(e.target.value)} placeholder='Title' required/>
       </label>
       <label>Author:
           <input onChange={(e) => setNewBlogAuthor(e.target.value)} placeholder='Author'/>
       </label>
       <label>Url:
           <input onChange={(e) => setNewBlogUrl(e.target.value)} placeholder='Url' required/>
       </label>
       <button type='submit'>Create</button>
      </form>
  )
}

PostBlog.propTypes = {
  onBlogPost: PropTypes.func.isRequired
}

export default PostBlog
