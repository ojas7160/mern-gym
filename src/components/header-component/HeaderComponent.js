import React from 'react';
import './HeaderComponent.css'
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const HeaderComponent = (props) => {
  let leftuls = []
  let rightuls = []
  let index = 0;
  
  props.leftlist.forEach(li => {
    leftuls.push(
      <Nav.Item key={index++} className={"mr-15"}>
        <NavLink activeClassName="active" className="color-white" to={li.link}>{li.name}</NavLink>
      </Nav.Item>
    )
  })

  props.rightlist.forEach(li => {
    rightuls.push(
      <Nav.Item key={index++} className={"mr-15"}>
        <NavLink activeClassName="active" className="color-white" to={li.link}>{li.name}</NavLink>
      </Nav.Item>
    )
  })
  return (    
    <div className="header-wrapper">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">Ojas</Navbar.Brand>
        <Nav className="mr-auto">
          {leftuls}
        </Nav>
        <Nav className="justify-content-end">
          {rightuls}
        </Nav>
      </Navbar>
    </div>
  )
}

export default HeaderComponent;