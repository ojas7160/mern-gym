import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://192.168.1.206:3001'
})

instance.interceptors.request.use(request => {
    request.headers['authorization'] = 'Bearer ' + localStorage.getItem('token')
    return request;
})

instance.interceptors.response.use(res => res)

//   componentWillUnmount() {
//     axios.interceptors.request.eject(this.reqInterceptor)
//     axios.interceptors.response.eject(this.resInterceptor);
//   }


export default instance;