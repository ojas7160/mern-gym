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

export default { getItem, getToken, setItem, getAllUsers, getUser };