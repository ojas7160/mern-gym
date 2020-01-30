import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://192.168.1.206:3001'
})

export default instance;