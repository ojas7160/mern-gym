import Axios from '../../axios-instance';

const BaseURI = '/api/user/';
  
const getToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

const getItem = (item) => {
  return localStorage.getItem(item);
}

const setItem = (itemName, item) => {
  return localStorage.setItem(itemName, item);
}

const getAllUsers = () => {
  return Axios.get(BaseURI + 'getAllUsers');
}

const getUser = (id) => {
  return Axios.get(BaseURI + 'getUser/' + id);
}

const updateProfile = (id, data) => {
  return Axios.put(BaseURI + 'updateUser/' + id, data);
}

export default { getItem, getToken, setItem, getAllUsers, getUser, updateProfile };