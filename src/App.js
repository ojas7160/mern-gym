import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/HeaderComponent';
import Routes from './components/routes/routes';


class App extends Component {
  render() {
    const header = [{link: '/', name: 'Home'}, {link: '/dashboard', name: 'Dashboard'}]
    
    return (
      <div className="App">
        <HeaderComponent lis={header} />
        <Routes />
      </div>
    );
  }
}

export default App;