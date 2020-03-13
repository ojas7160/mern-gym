import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import Routes from './components/routes/routes';
import { withRouter } from 'react-router-dom';
import * as userService from './services/users-service/userService';
import { connect } from 'react-redux';

class App extends Component {

  state = {isLogout: false, authed: localStorage.getItem('token')}

  handleMouseMove = () => {
    this.setIdleTime(1);
  }

  handleKeyPress = () => {
    this.setIdleTime(1);
  }

  componentDidMount() {
    this.props.checkLogin();
    this.startTracker();
  }

  

  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log('route changed');
    this.startTracker()
  }

  startTracker() {
    this.clearIntervals()
    const token = userService.default.getItem('token');
    if(token) {
      this.trackActivity();
    }
  }

  clearIntervals() {
    let i = setInterval({}, 0)
    while(i) {
      clearInterval(i);
      i--;
    }
  }

  trackActivity() {
    this.setIdleTime(1);
    var self = this;

    const timerData = setInterval(timer, 1000);

    document.getElementById('root').addEventListener('mousemove', this.handleMouseMove)
    document.getElementById('root').addEventListener('keypress', this.handleKeyPress)
    function timer() {
      self.setIdleTime(self.getIdleTime() + 1);
      if(Math.round(self.getIdleTime()) > 15 * 60) { // 15 mins timeout
        self.setIdleTime(1);
        self.stopTracker();
      }
    }
  }

  stopTracker() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload(true);
  }

  setIdleTime(idleTime) {
    const idleTimeData = userService.default.getItem('idleTime');
    if(idleTimeData && Object.keys(idleTimeData).length) {
      let time = JSON.parse(idleTimeData);
      time['idleTime'] = idleTime;
      userService.default.setItem('idleTime', JSON.stringify( time ));
    } else {
      userService.default.setItem( 'idleTime', JSON.stringify( {idleTime: idleTime, windowCounter: 1} ) )
    }
  }

  getIdleTime() {
    const idleTime = userService.default.getItem('idleTime');

    if(idleTime && Object.keys(idleTime).length) {
      return JSON.parse(idleTime).idleTime
    } else {
      return 1;
    }
  }

  getWindowCounter() {

  }

  thisLogout = () => {
    console.log('here')
    localStorage.clear();
    // this.setState({isLogout: true, authed: null})
    // this.props.history.push('/login');
  }

  abc = () => {
    console.log('abc')
  }

  login = () => {
    console.log(this.props)
    
    this.setState({authed: localStorage.getItem('token')})
  }

  render() {   
    return (
      <div className="App">
        <HeaderComponent thisLogout={this.thisLogout} abc={this.abc} authed={this.state.authed} />
        <Routes logout={this.state.isLogout} handleSubmit={this.handleSubmit} />
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