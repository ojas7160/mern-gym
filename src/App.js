import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import Routes from './components/routes/routes';

class App extends Component {
  render() {
    const leftHeader = [
      {link: '/home', name: 'Home' , type:'left'}, 
      {link: '/dashboard', name: 'Dashboard', type:'left'},
    ]

    const rightHeader = [
      {link:'/login', name:'Login', type:'right'}
    ]
    
    return (
      <div className="App">
        <HeaderComponent leftlist={leftHeader} rightlist={rightHeader}/>
        <Routes />
      </div>
    );
  }
}

export default App;