import './App.css'

import { useBlogs, useResource } from './hooks'
import {
  useAuthValue,
  useAuthDispatch,
  clearAction,
  loginService,
  loginAction,
} from './hooks/userAuth'

import { Routes, Route, useLocation, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogList from './components/BlogList'

const App = () => {
  const [blogResource, blogServices] = useBlogs()
  const [usersResources, usersMutations] = useResource('users')
  const authDispatch = useAuthDispatch()
  const userLogged = useAuthValue()

  let location = useLocation()

  const onLoginHandler = async (e, username, password) => {
    e.preventDefault()
    const userData = await loginService({ username, password })
    authDispatch(loginAction(userData))
  }

  const onLogoutHandler = (e) => {
    e.preventDefault()
    authDispatch(clearAction())
  }

  if (blogResource.errorContent) return blogResource.errorContent
  else if (blogResource.data)
    return (
      <main>
        <Notification />
        <div className="navbar">
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
        </div>
        <h2>Log in</h2>
        {userLogged.id === null ? (
          <LoginForm
            onLoginHandler={(e) =>
              onLoginHandler(
                e,
                e.target.username.value,
                e.target.password.value,
              )
            }
          />
        ) : (
          <>
            <span>Logged as {userLogged.name}</span>
            <button onClick={(e) => onLogoutHandler(e)}>Logout</button>
          </>
        )}
        <h2>Post a blog</h2>
        {userLogged.id !== null ? (
          <BlogForm />
        ) : (
          <p>You need to login to post blogs</p>
        )}
        {location.pathname.split('/').findIndex((e) => e === 'blogs') !==
          -1 && <h2>Blogs</h2>}
        {location.pathname.split('/').findIndex((e) => e === 'users') !==
          -1 && <h2>Users</h2>}
        <Routes>
          {blogResource.data.map((blog) => (
            <Route
              key={blog.id}
              path={`/blogs/${blog.id}`}
              element={
                <Blog
                  blog={blog}
                  loggedUserId={userLogged.id || undefined}
                  onLikeHandler={blogServices.onVoteHandler}
                  onRemoveHandler={blogServices.onRemoveHandler}
                />
              }
            />
          ))}
          {usersResources.data.length !== 0 &&
            usersResources.data.map((user) => (
              <Route
                key={user.id}
                path={`/users/${user.id}`}
                element={<User user={user} />}
              />
            ))}
          <Route
            path="/blogs"
            element={<BlogList blogs={blogResource.data} />}
          />
          <Route
            path="/users"
            element={
              usersResources.data.length !== 0 && (
                <UsersList users={usersResources.data} />
              )
            }
          />
        </Routes>
      </main>
    )
}

export default App
