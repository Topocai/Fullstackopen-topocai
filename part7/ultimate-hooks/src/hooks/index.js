import { useState } from 'react'
import axios from 'axios'

export const useResource = apiUrl => {
  const [token, setToken] = useState(null)
  const [resources, setResources] = useState([])

  const baseUrl = apiUrl

  const updateToken = newToken => setToken(`bearer ${newToken}`)

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
    try {
      const response = await axios.post(baseUrl, newObject, config)
      setResources(prevData => [...prevData, response.data])
    } catch (err) {
        console.error(err)
    }
  }

  const update = async (id, newObject) => {
    try {
      const response = await axios.put(`${ baseUrl }/${id}`, newObject)
      setResources(prevData => [...prevData.map(r => r.id == id ? response.data : r)])
    } catch (err) {
        console.error(err)
    }
  }

  const service = {
    create,
    getAll,
    update,
    updateToken
  }

  return [
    resources,
    service
  ]
}