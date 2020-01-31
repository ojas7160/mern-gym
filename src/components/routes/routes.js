import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from '../../containers/dashboard-component/DashboardComponent';
import HomeComponent from '../home-component/HomeComponent';
import NotFoundComponent from '../not-found/NotFoundComponent';
import PrivateRoute from '../auth/route-guards/PrivateRoute';
import LoginComponent from '../../containers/login/login-component'
import register from '../../containers/register/register-component'

const routes = (props) => {
  const authed = JSON.parse(localStorage.getItem('permit'));
  return ( 
    <Switch>
        <Route path = "/home" exact component = {HomeComponent} />
        <PrivateRoute authed={authed} path='/dashboard' exact component={DashboardComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={register} />
        <Route path = "/" component = {HomeComponent} />
        <Route path="*" component={NotFoundComponent} />
    </Switch>
  )
}

export default routes;

