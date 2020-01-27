import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import  DashboardComponent  from './components/dashboard-component/DashboardComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={DashboardComponent} />
          {/* <Route path="/" exact component={} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
