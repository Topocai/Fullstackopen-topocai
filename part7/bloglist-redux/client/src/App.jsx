import { useEffect, useState } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import {
  initialize as initializeBlogs,
  likeBlog,
  removeBlog,
} from './reducers/blogsReducer'

import { login, logout } from './reducers/userReducer'

import Notification from './components/Notification'

import LoginForm from './components/loginForm'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import ToggeableComponent from './components/toggleable'

function App() {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const onLoginHandler = (e, username, password) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <>
      <Notification />
      <h2>Login</h2>
      {user.token === null ? (
        <LoginForm
          onLoginHandler={(e) =>
            onLoginHandler(e, e.target.username.value, e.target.password.value)
          }
        />
      ) : (
        <div>
          {user.name} logged in{' '}
          <button onClick={() => dispatch(logout())}>logout</button>
        </div>
      )}

      <h2>create new</h2>
      {user.token !== null ? (
        <ToggeableComponent hideLabel="cancel" showLabel="new blog">
          <BlogForm />
        </ToggeableComponent>
      ) : (
        <p>You need to login to post a blog</p>
      )}

      <h2>blogs</h2>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUserId={user.id ? user.id : ''}
            onLikeHandler={() => dispatch(likeBlog(blog))}
            onRemoveHandler={() => dispatch(removeBlog(blog.id))}
          />
        ))}
      </div>
    </>
  )
}

export default App
