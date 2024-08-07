import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notify',
  initialState: {
    message: null,
    color: 'green',
    interval: null,
  },
  reducers: {
    set: (state, { payload }) => {
      state.message = payload.message
      state.color = payload.color
      state.interval = payload.interval
    },
    clear: (state) => {
      state.message = null
      state.color = 'green'
    },
    clearInt: (state) => clearInterval(state.interval),
  },
})

export const { set, clear, clearInt } = slice.actions

export const setNotify = (message, color = 'green', time = 5) => {
  return async (dispatch) => {
    dispatch(clearInt())
    const interval = setInterval(() => {
      dispatch(clear())
    }, time * 1000)
    dispatch(set({ message, color, time, interval }))
  }
}

export default slice.reducer
