import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://192.168.1.206:8081'
})

instance.interceptors.request.use(request => {
    request.headers['authorization'] = 'Bearer ' + localStorage.getItem('token')
    return request;
})

// instance.defaults.headers.common['Authorization'] = 'Auth Token From Instance'; // we can add headers in interceptors like this also

instance.interceptors.response.use(res => res)

//   componentWillUnmount() {
//     axios.interceptors.request.eject(this.reqInterceptor)
//     axios.interceptors.response.eject(this.resInterceptor);
//   }


export default instance;