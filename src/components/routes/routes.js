import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from '../dashboard-component/DashboardComponent';
import HomeComponent from '../home-component/HomeComponent';
import NotFoundComponent from '../not-found/NotFoundComponent';
import PrivateRoute from '../auth/route-guards/PrivateRoute';

const routes = (props) => {
  const authed = JSON.parse(localStorage.getItem('permit'));
  return ( 
    <Switch>
      <PrivateRoute authed={authed} path='/dashboard' component={DashboardComponent} />
      <Route path="/" exact component={HomeComponent} />
      <Route path="/not-found" exact component={NotFoundComponent} />
    </Switch>
  )
}

export default routes;

