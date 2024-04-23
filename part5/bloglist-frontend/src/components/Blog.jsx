import ToggeableComponent from "./toggleable"
import blogServices from "../services/blogs"

import { useState } from "react"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, refreshBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeHandler = async (event) => {
    event.preventDefault()
    try {
      const request = await blogServices.likeBlog(blog.id, { likes: blog.likes + 1 })
      setLikes(request.likes) 
      //if its wanted, we can use "refreshBlogs" from app.jsx to update the list and set in order per likes too.
      //Also that solution removes the useState from this component because isn't needed.
    } catch {
      console.log('error in like')
    }
  }

  const removeHandler = async (event) => {
    event.preventDefault()
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(confirm) {
      try {
        await blogServices.removeBlog(blog.id)

        refreshBlogs()
      } catch {
        console.log('error in remove')
      }
    } else {}
  }

  return (
    <div style={blogStyle}>
      "{blog.title}"
      <ToggeableComponent hideLabel='hide' showLabel='view'>
        <a href={blog.url}><p>{blog.url}</p></a>
        <p>{likes} likes <button onClick={(e) => likeHandler(e)}>Like</button></p>
        <p>~ {blog.author}</p>

        <button onClick={(e) => removeHandler(e)}>Remove</button>
      </ToggeableComponent>
    </div>  
  )
  
}

export default Blog