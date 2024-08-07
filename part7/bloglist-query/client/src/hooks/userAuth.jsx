import { useReducer, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const initialState = {
  id: null,
  username: null,
  name: null,
  token: null,
}

export const loginService = async (user) => {
  try {
    const request = await axios.post('/api/login', user)
    window.localStorage.setItem('userLogged', JSON.stringify(request.data))
    return request.data
  } catch {
    return initialState
  }
}

const clear = () => {
  console.log('clear')
  window.localStorage.removeItem('userLogged')
  return initialState
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'user/login':
      return action.payload != null ? action.payload : state
    case 'user/clear':
      return clear()
    default:
      return state
  }
}

const UserContext = createContext()

export const loginAction = (user) => ({ type: 'user/login', payload: user })

export const clearAction = () => ({ type: 'user/clear' })

const useAuthEffect = (userDispatch) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userLogged')
      ? JSON.parse(window.localStorage.getItem('userLogged'))
      : null
    userDispatch(loginAction(loggedUserJSON))
  }, [userDispatch])
}

const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)
  useAuthEffect(userDispatch)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useAuthValue = () => {
  const state = useContext(UserContext)
  if (state) return state[0]
  else return null
}

export const useAuthDispatch = () => {
  const state = useContext(UserContext)
  if (state) return state[1]
  else return null
}

export async function onLoginHandler(e, username, password) {
  e.preventDefault()
  const userData = await loginService({ username, password })
  useAuthDispatch(loginAction(userData))
}

export const onLogoutHandler = () => {
  const dispatch = useAuthDispatch()
  dispatch(clearAction())
}

export default UserProvider
