import axios from 'axios'
const baseUrl = 'https://full-stack-open.fly.dev/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const put = (newName, newNumber, personId) => {
    return axios.put(`${baseUrl}/${personId}`, {name: newName, number: newNumber})
}

export default { getAll, create, update, remove, put }
