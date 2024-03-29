import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.post(baseUrl, newObject, config)
  const response = await axios.get(baseUrl)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${ baseUrl }/${id}`, config)
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, newObject) => {
   const config = {
    headers: { Authorization: token },
  }
  await axios.put(`${ baseUrl }/${id}`, newObject, config)
  const response = await axios.get(baseUrl)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, setToken }
