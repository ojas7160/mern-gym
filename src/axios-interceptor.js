import React, { Component } from 'react';

const axiosInterceptor = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      token: localStorage.getItem('token')
    }

    componentDidMount() {
      console.log('here')
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.requestHandler(request)
      })

      this.resInterceptor = axios.interceptors.response.use(res => res)
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor);
    }

    requestHandler = (req) => {
      req.headers['authorization'] = 'Bearer ' + this.state.token
      return req;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}

export default axiosInterceptor;