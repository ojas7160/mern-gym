import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardComponent from '../../containers/dashboard-component/DashboardComponent';
import HomeComponent from '../home-component/HomeComponent';
import NotFoundComponent from '../not-found/NotFoundComponent';
import PrivateRoute from '../auth/route-guards/PrivateRoute';
import LoginComponent from '../../containers/login/login-component'
import RegisterComponent from '../../containers/register/register-component';
// import UserComponent from '../user-component/UserComponent';
import ProfileComponent from '../../containers/profile-component/ProfileComponent';
import ChangePasswordComponent from '../../containers/change-password/changePasswordComponent';

const routes = (props) => {
  const authed = localStorage.getItem('token');
  
  return ( 
    <Switch>
        <Route path = "/home" component = {HomeComponent} />
        <PrivateRoute authed={authed} path='/dashboard' component={DashboardComponent} />
        <Route path="/users" exact component={RegisterComponent}/>
        <Route path="/profile" exact component={ProfileComponent}/>
        <Route path="/users/:id" component={RegisterComponent}/>
        <Route path="/changePassword" component={ChangePasswordComponent}/>
        <Route path="/login" component={() => <LoginComponent login={props.logout} />} />
        <Route path="/not-found" component={NotFoundComponent} />
        <Route path = "/" exact component = {HomeComponent} />
        <Route path="**" component={NotFoundComponent} />
    </Switch>
  )
}

export default routes;

