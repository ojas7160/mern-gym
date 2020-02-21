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

const getAllUsers = (page = 1) => {
  return Axios.get(BaseURI + 'getAllUsers?page='+page);
}

const getUser = (id) => {
  return Axios.get(BaseURI + 'getUser/' + id);
}

const updateProfile = (id, data) => {
  return Axios.put(BaseURI + 'updateUser/' + id, data);
}

const changePassword = (data) => {
  return Axios.post(BaseURI + 'changeUserPassword/',  data);
}

const loginUser = (data) => {
  return Axios.post(BaseURI + 'login', { email: data.email, password: data.password });
}
export default { getItem, getToken, setItem, getAllUsers, getUser, updateProfile, changePassword, loginUser };