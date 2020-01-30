import React, { Component } from 'react';
import './login-component.css'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            email: null, 
            password: '' , 
            showDetails: false,
            emailValid: true
        };

        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onchangeEmail(event) {        
        this.setState({ email: event.target.value },()=>{
            this.setState({emailValid: this.state.email.length ? true : false})
            // this.emailValid = this.state.email.length ? true : false
        });
    }

    onchangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        this.user = {};
        this.user.email = this.state.email;
        this.user.password  = this.state.password;
        console.log(this.user);
        this.setState({showDetails:true})
        event.preventDefault();
    }

    resetForm = () => {
        this.setState({email:"",password:"", showDetails: false})
    }

    render() {
        return (
            <div className="fullHeight">
                <div className="login-wrapper">
                    <div className="container">
                        <div className="card"></div>
                        <div className="card">
                            <h1 className="title">Login</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-container">
                                    <input type="email" name="email" value={this.state.email} onChange={this.onchangeEmail} required />
                                    <label>Email</label>
                                    <div className="bar"></div>
                                    {this.state.emailValid ? null : (<span className="error"> Email Address is Required </span>)}
                                </div>
                                <div className="input-container">
                                    <input type="password" name="password" value={this.state.password} onChange={this.onchangePassword} required="required" />
                                    <label>Password</label>
                                    <div className="bar"></div>
                                    {/* <span className="error"> Password is Required </span> */}
                                </div>
                                <div className="button-container">
                                    <input type="submit" value="Login" style={{marginRight:'15px'}} disabled={!this.emailValid} />
                                    <input type="reset" value="Reset" onClick={this.resetForm}/>
                                </div>
                            </form >
                            {this.state.showDetails ? (<div className="displayLoginScreen">
                                <h3> Current User </h3>
                                <p> {this.user.email} </p>
                                <p> {this.user.password} </p>
                            </div>) : null }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent;