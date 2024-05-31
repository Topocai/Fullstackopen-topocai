const BASE_URL = 'http://localhost:3011/anecdotes'

import axios from 'axios'

const getAll = async () => {
  const request = await axios.get(BASE_URL)
  return request.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(BASE_URL, object)
  return response.data
}

const putVote = async (id) => {
  const note = await axios.get(`${BASE_URL}/${id}`)
  const request = await axios.put(`${BASE_URL}/${id}`, { ...note.data, votes: note.data.votes + 1 })
  return request.data
}

export {
  getAll,
  createNew,
  putVote
}