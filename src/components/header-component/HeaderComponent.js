import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderComponent = (props) => {
  let uls = []
  let index = 0
  props.lis.forEach(li => {
    uls.push(
      <li key={index++}>
        <NavLink to={li.link}>{li.name}</NavLink>
      </li>
    )
  })
  return (    
    <div>
      <header>
        <ul>
          {uls}
        </ul>
      </header>
    </div>
  )
}

export default HeaderComponent;