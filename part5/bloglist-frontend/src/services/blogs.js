import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

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