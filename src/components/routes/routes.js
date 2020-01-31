import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from '../dashboard-component/DashboardComponent';
import HomeComponent from '../home-component/HomeComponent';
import NotFoundComponent from '../not-found/NotFoundComponent';
import PrivateRoute from '../auth/route-guards/PrivateRoute';
import LoginComponent from '../../containers/login/login-component';


const routes = (props) => {
  const authed = localStorage.getItem('token');
  console.log(props)
  
  return ( 
    <Switch>
        <Route path = "/home" component = {HomeComponent} />
        <PrivateRoute authed={authed} path='/dashboard' component={DashboardComponent} />
        {/* <Route path="/login" component={LoginComponent}/> */}
        <Route path="/login" component={() => <LoginComponent login={props.logout} handleSubmit={props.handleSubmit}/>} />
        <Route path="/not-found" component={NotFoundComponent} />
        <Route path = "/" exact component = {HomeComponent} />
        <Route path="**" component={NotFoundComponent} />
    </Switch>
  )
}

export default routes;

