import { createSlice } from '@reduxjs/toolkit'

import { setNotify } from './notificationReducer'

import {
  getAll,
  likeBlog as likeService,
  removeBlog as removeService,
  postBlog as postService,
} from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    add: (state, { payload }) => {
      state.push(payload)
    },
    set: (state, { payload }) => (state = payload.content),
    like: (state, { payload }) => {
      state[state.findIndex((b) => b.id === payload.id)].likes++
    },
    remove: (state, { payload }) => {
      state.splice(
        state.findIndex((b) => b.id === payload),
        1,
      )
    },
  },
})

export const { add, set, like, remove } = slice.actions

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(set({ content: blogs }))
  }
}

export const likeBlog = (blogData) => {
  return async (dispatch) => {
    try {
      const blog = await likeService(blogData)
      dispatch(like({ id: blog.id }))
      dispatch(setNotify(`${blog.title} liked`))
    } catch (err) {
      dispatch(
        setNotify(
          `Error liking: ${err.response.data.error ? err.response.data.error : err.message}`,
          'red',
          5,
        ),
      )
    }
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await removeService(blogId)
      dispatch(remove({ id: blogId }))
      dispatch(setNotify(`Blog removed`))
    } catch (err) {
      dispatch(
        setNotify(
          `Error removing: ${err.response.data.error ? err.response.data.error : err.message}`,
          'red',
          5,
        ),
      )
    }
  }
}

export const postBlog = (blogData) => {
  return async (dispatch) => {
    try {
      const blog = await postService(blogData)
      dispatch(add(blog))
      dispatch(setNotify(`${blog.title} created`))
    } catch (err) {
      dispatch(
        setNotify(
          `Error creating: ${err.response.data.error ? err.response.data.error : err.message}`,
          'red',
          5,
        ),
      )
    }
  }
}

export default slice.reducer
