import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DashboardComponent from './components/dashboard-component/DashboardComponent';
import HomeComponent from './components/home-component/HomeComponent';
import HeaderComponent from './components/header-component/HeaderComponent';
import NotFoundComponent from './components/not-found/NotFoundComponent';
import PrivateRoute from './components/auth/route-guards/PrivateRoute';

class App extends Component {
  render() {
    const header = [{link: '/', name: 'Home'}, {link: '/dashboard', name: 'Dashboard'}]
    const authed = JSON.parse(localStorage.getItem('permit'));
    return (
      <div className="App">
        <HeaderComponent lis={header}></HeaderComponent>
        {/* <a href="/dashboard">Dashboard</a>
        <a href='/'>Home</a> */}
        <Switch>
          {/* <Route path="/dashboard" component={DashboardComponent} /> */}
          <PrivateRoute authed={authed} path='/dashboard' component={DashboardComponent} />
          <Route path="/" exact component={HomeComponent} />
          <Route path="/not-found" exact component={NotFoundComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
