import { createSlice } from '@reduxjs/toolkit'

import { getAll, createNew, putVote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, { payload }) => {state[state.findIndex(n => n.id === payload)].votes++},
    addNotes: (state, { payload }) => [...state, ...payload.notes],
    addNote: (state, { payload }) => { state.push(payload) }
  }
})

export const { voteAnecdote, addNote, addNotes } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await getAll()
    dispatch(addNotes({ notes }))
  } 
}

export const postNote = (content) => {
  return async dispatch => {
    const newNote = await createNew(content)
    dispatch(addNote(newNote))
  }
}

export const voteNote = (id) => {
  return async dispatch => {
    const newNote = await putVote(id)
    dispatch(voteAnecdote(newNote.id))
  }
}

export default anecdoteSlice.reducer