import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import Routes from './components/routes/routes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {

  state = {isLogout: false, authed: localStorage.getItem('token')}

  componentDidMount() {
    this.props.checkLogin();
  }

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

  render() {   
    return (
      <div className="App">
        <HeaderComponent logout={this.logout} authed={this.state.authed}/>
        <Routes logout={this.state.isLogout} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    checkLogin: () => dispatch({type: 'CHECKLOGIN', authed: localStorage.getItem('token')})
  }
}

export default connect(null, mapDispatchToprops)(withRouter(App));