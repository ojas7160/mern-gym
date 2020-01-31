import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import Routes from './components/routes/routes';
import { withRouter, Redirect } from 'react-router-dom';
import Axios from './axios-instance';
import toastr from 'toastr';
class App extends Component {

  state = {isLogout: false, authed: localStorage.getItem('token')}

  logout = () => {
    console.log(this.props)
    localStorage.clear();
    this.setState({isLogout: true, authed: null})
    console.log(this.state.authed)
    this.props.history.push('/login');
  }

  login = () => {
    console.log(this.props)
    
    this.setState({authed: localStorage.getItem('token')})
  }

  // handleSubmit(event) {
  //   // this.setState((prevState) => {
  //   //   return {showDetails: true, userDetail: {email: prevState.email, password: prevState.password}}
  //   // })
  //   // console.log(this.props)
  //   console.log('hello')
  //   Axios.post('/api/user/login', {email: 'ojas@ww.com', password: 'ojas7160'})
  //   .then((res) => {
  //     // console.log(this.props)
  //     toastr.success(res.data.message, 'Success!');
  //     localStorage.setItem('loginUser', res.data.user.email);
  //     localStorage.setItem('token', res.data.token)
  //     // this.props.history.push('/dashboard');
  //     return <Redirect  to={{pathname: "/dashboard"}} />
  //     // this.setState({authed: localStorage.getItem('token')});
            
  //   })
  //   .catch((err) => {
  //     if(err.response){
  //         toastr.error(err.response.data.message, 'Error');
  //     }
  //   })
  //   event.preventDefault();
  // }
  render() {
    const leftHeader = [
      {link: '/home', name: 'Home' , type:'left', id: 'home'}, 
      {link: '/dashboard', name: 'Dashboard', type:'left', id: 'dashboard'},
    ]
    
    const rightHeader = [
      {link:'/login', name:'Login', type:'right', id: 'logout'}
    ]
    
    
    return (
      <div className="App">
        <HeaderComponent logout={this.logout} authed={this.state.authed}/>
        <Routes logout={this.state.isLogout} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(App);