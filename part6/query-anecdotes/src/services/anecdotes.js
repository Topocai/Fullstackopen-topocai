import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

export const getAll = () => axios.get(BASE_URL).then(res => res.data)

export const createNote = content => axios.post(BASE_URL, { content, votes: 0 })

export const putNote = (id, newObject) => axios.put(`${BASE_URL}/${id}`, newObject)

export const voteNote = note => putNote(note.id, { ...note, votes: note.votes + 1 })