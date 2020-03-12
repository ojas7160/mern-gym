import React, { Component } from 'react';
import './HeaderComponent.css'
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userService from '../../services/users-service/userService';

class HeaderComponent extends Component {

  state = {
    authed: localStorage.getItem('token'),
    index: 0
  }
  leftuls = []
  rightuls = []

  UNSAFE_componentDidMount() {
  }

  UNSAFE_componentWillMount() {
  }

  // componentWillUpdate(newState, prevState) {
  //   if(newState.authed !== prevState.authed) {
  //     this.setState({authed: this.props.authed});
  //   }
  // }


  logout = () => {
    localStorage.clear();
    this.setState({authed: null});
    this.props.logout();
    this.props.history.push('/login');
  }

  login = () => {
    this.props.history.push('/login')
  }

  register = () => {
    this.props.history.push('/users');
  }

  changePassword = () => {
    userService.default.changePassword
    .then(response => {

    })
  }

  render() {     
    return (
      <div className="header-wrapper">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="/">Ojas</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item className="mr-15">
              <NavLink activeClassName="active" className="color-white" to='/home'>Home</NavLink>
            </Nav.Item>
            <Nav.Item className="mr-15">
              <NavLink activeClassName="active" className="color-white" to='/dashboard'>Dashboard</NavLink>
            </Nav.Item>
            <Nav.Item className="mr-15">
              <NavLink activeClassName="active" className="color-white" to='/posts'>Posts</NavLink>
            </Nav.Item>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item className="mr-15">
            {this.props.authed ? (
              <NavLink activeClassName="active" className="color-white" to='/changePassword'>Change Password</NavLink>
            ) : null}
            </Nav.Item>
            <Nav.Item className="mr-15">
              {this.props.authed ? ((<Button variant="info" onClick={this.logout}>Logout</Button>))
              : ( <span> <Button variant="info" onClick={this.login}>Login</Button> <Button variant="info" onClick={this.register}>Register</Button> </span>)}
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authed: state.loginReducer.token
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    logout: () => dispatch({type: 'LOGOUT', authed: null})
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(withRouter(HeaderComponent));