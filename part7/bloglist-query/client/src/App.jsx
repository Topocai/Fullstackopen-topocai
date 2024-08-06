import './App.css'

import { useBlogs } from './hooks'
import {
  useAuthValue,
  useAuthDispatch,
  clearAction,
  loginService,
  loginAction,
} from './hooks/userAuth'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogResource, blogMutations] = useBlogs()
  const authDispatch = useAuthDispatch()
  const userLogged = useAuthValue()

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
          <button onClick={(e) => onLogoutHandler(e)}>Logout</button>
        )}
        <h2>Post a blog</h2>
        {userLogged.id !== null ? (
          <BlogForm />
        ) : (
          <p>You need to login to post blogs</p>
        )}

        <h2>blogs</h2>
        <Notification />
        {blogResource.data.map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              loggedUserId={'66ac4e98bd6d8f5c8632e9de'}
              onLikeHandler={blogMutations.onVoteHandler}
              onRemoveHandler={blogMutations.onRemoveHandler}
            />
          </div>
        ))}
      </main>
    )
}

export default App
