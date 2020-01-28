import React from 'react';
import './HeaderComponent.css'
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const HeaderComponent = (props) => {
  let uls = []
  let index = 0
  props.lis.forEach(li => {
    uls.push(
      <Nav.Item key={index++} className="mr-15">
        <NavLink activeClassName="active" className="color-white" to={li.link}>{li.name}</NavLink>
      </Nav.Item>
    )
  })
  return (    
    <div className="header-wrapper">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Ojas</Navbar.Brand>
        <Nav className="mr-auto">
          {uls}
        </Nav>
      </Navbar>
    </div>
  )
}

export default HeaderComponent;