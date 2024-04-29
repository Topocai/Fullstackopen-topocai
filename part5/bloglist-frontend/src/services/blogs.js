import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'test' ? 'http://localhost:3001/api/blogs' : '/api/blogs'

let token = null

// eslint-disable-next-line no-return-assign
const setToken = (newToken) => token = `Bearer ${newToken}`

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (blogData) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl, blogData, config)

  return request.data
}

const likeBlog = async (blogId, likes) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.put(`${baseUrl}/${blogId}`, likes, config)

  return request.data
}

const removeBlog = async (blogId) => {
  console.log('blogId', blogId)
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, postBlog, setToken, likeBlog, removeBlog }
