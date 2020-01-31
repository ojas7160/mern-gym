import React, { Component } from 'react';
import './HeaderComponent.css'
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class HeaderComponent extends Component {

  state = {
    authed: this.props.authed,
    index: 0
  }
  leftuls = []
  rightuls = []
  updateIndex = () => {
    this.setState(prevState => {return {index: prevState.index + 1}})
  }

  logout = () => {
    localStorage.clear();
    this.setState({authed: null});
    this.props.history.push('/login');
  }

  login = () => {
    this.props.history.push('/login')
  }

  render() {
    console.log(this.state.authed)
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
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item className="mr-15">
              {this.state.authed ? ((<Button variant="info" onClick={this.logout}>Logout</Button>))
              : (<Button variant="info" onClick={this.login}>Login</Button>)}
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(HeaderComponent);