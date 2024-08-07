import { createSlice } from '@reduxjs/toolkit'

import { login as loginService } from '../services/login'
import { setNotify } from './notificationReducer'
import { setToken } from '../services/blogs'

const slice = createSlice({
  name: 'user',
  initialState: () => {
    const loggedUserJSON = window.localStorage.getItem('userLogged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      return user
    }
    return { token: null, username: '', name: '', id: '' }
  },
  reducers: {
    set: (state, { payload }) => {
      state.token = payload.content.token
      state.username = payload.content.username
      state.name = payload.content.name
      state.id = payload.content.id
    },
    clear: () => ({
      token: null,
      username: '',
      name: '',
      id: '',
    }),
  },
})

export const { set, clear } = slice.actions

export const login = (userData) => {
  console.log(userData)
  return async (dispatch) => {
    if (!userData.username || !userData.password) {
      return dispatch(clear())
    }
    try {
      const loginData = await loginService(userData)
      dispatch(set({ content: loginData }))
      dispatch(setNotify(`${loginData.name} Login successful, welcome`))
      setToken(loginData.token)
      window.localStorage.setItem('userLogged', JSON.stringify(loginData))
    } catch (err) {
      dispatch(
        setNotify(
          `Login error: ${err.response.data.error ? err.response.data.error : err.message}`,
          'red',
          5,
        ),
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(clear())
    dispatch(setNotify('Logout successful'))
    setToken(null)
    window.localStorage.removeItem('userLogged')
  }
}

export default slice.reducer
