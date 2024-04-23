import { useState } from 'react'

const PostBlog = ({ onBlogPost }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  
  return (
      <form onSubmit={(e) => onBlogPost(e, {newBlogTitle, newBlogAuthor, newBlogUrl})}>
       <label>Title: 
           <input onChange={(e) => setNewBlogTitle(e.target.value)} required/>
       </label>
       <label>Author: 
           <input onChange={(e) => setNewBlogAuthor(e.target.value)}/>
       </label>
       <label>Url: 
           <input onChange={(e) => setNewBlogUrl(e.target.value)} required/>
       </label>
       <button type='submit'>Create</button>
      </form>
  )
}

export default PostBlog