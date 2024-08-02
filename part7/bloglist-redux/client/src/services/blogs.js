import axios from 'axios'
const baseUrl =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3001/api/blogs'
    : '/api/blogs'

let token = null

const setToken = (newToken) => (token = `Bearer ${newToken}`)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, blogData, config)

  return request.data
}

const likeBlog = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(
    `${baseUrl}/${blogData.id}`,
    { ...blogData, likes: blogData.likes + 1 },
    config,
  )

  return request.data
}

const removeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${blogId}`, config)
}

export { getAll, postBlog, setToken, likeBlog, removeBlog }
