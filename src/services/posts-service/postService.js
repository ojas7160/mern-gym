import Axios from '../../axios-instance';

const BaseURI = '/api/posts';

const createPost = (data) => {
  console.log(data)
  return Axios.post(BaseURI + '/', data);
}

const getAllPosts = () => {
  return Axios.get(BaseURI + '/getAllPosts');
}

export default { createPost, getAllPosts };