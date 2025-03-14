import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}


const remove = id => axios.delete(`${baseUrl}/${id}`);

export default { 
  getAll: getAll, 
  create: create, 
  remove: remove
}