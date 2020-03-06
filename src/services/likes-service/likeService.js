import axios from '../../axios-instance';

const BaseURI = '/api/likes';

const like = (data) => {
  return axios.post(BaseURI + '/like', data);
}

const dislike = (data) => {
  return axios.post(BaseURI + '/dislike', data);
}

export default { like, dislike };