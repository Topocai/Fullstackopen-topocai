import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/notification'

import blogService from './services/blogs'
import loginService from './services/login'
import PostBlog from './components/blogForm'
import LoginForm from './components/loginForm'
import ToggeableComponent from './components/toggleable'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ message: null, color: null, timeout: null })

  async function refreshBlogs () {
    const refreshBlogs = await blogService.getAll()

    refreshBlogs.sort((a, b) => b.likes - a.likes)

    setBlogs(refreshBlogs)
  }

  useEffect(() => {
    refreshBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userLogged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, { color, time }) => {
    if (notification.timeout != null) {
      setNotification({ message, color, timeout: clearTimeout(notification.timeout) })
    }
    const timeout = setTimeout(() => setNotification({ message: null, color: null }), time || 5000)
    setNotification({ message, color, timeout })
  }

  const onLoginHandler = async (event, { username, password }) => {
    event.preventDefault()
    try {
      const loginData = await loginService.login({ username, password })

      window.localStorage.setItem('userLogged', JSON.stringify(loginData))
      blogService.setToken(loginData.token)
      setUser(loginData)

      showNotification(`${loginData.name} Login successful, welcome`, { color: 'green' })
    } catch (err) {
      showNotification(`${err}`, { color: 'red' })
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('userLogged')
    blogService.setToken(null)

    showNotification('Logout successful', { color: 'yellow' })
  }

  const onBlogPost = async (event, { newBlogTitle, newBlogAuthor, newBlogUrl }) => {
    event.preventDefault()
    const blogData = { title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }
    try {
      const response = await blogService.postBlog(blogData)
      setBlogs(blogs.concat(response))

      showNotification(`"${newBlogTitle}" by ${newBlogAuthor} added`, { color: 'green' })
    } catch {
      showNotification('Something went wrong', { color: 'red' })
    }
  }

  return (
    <div>
      <Notification message={notification.message} color={notification.color} />
      <h2>Login</h2>
      {user === null ? <LoginForm onLoginHandler={onLoginHandler}/> : <div>{user.name} logged in <button onClick={logout}>logout</button></div>}
      <h2>create new</h2>
      {
      user !== null
        ? <ToggeableComponent hideLabel='cancel' showLabel='new blog'>
        <PostBlog onBlogPost={onBlogPost}/>
      </ToggeableComponent>
        : <p>You need to login to post a blog</p>
      }

      <h2>blogs</h2>
      {user !== null ? blogs.map(blog => <Blog key={blog.id} blog={blog} refreshBlogs={refreshBlogs}/>) : <p>You need to login to see blogs</p>}

    </div>
  )
}

export default App
