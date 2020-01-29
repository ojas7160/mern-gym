import React, { Component } from 'react';
import './login-component.css'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '' , showDetails: false};

        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onchangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onchangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        console.log('A name was submitted:', this.state.email, this.state.password);
        this.setState({showDetails:true})
        event.preventDefault();
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
                                    {/* <span className="error"> Email Address is Required </span> */}
                                </div>
                                <div className="input-container">
                                    <input type="password" name="password" value={this.state.password} onChange={this.onchangePassword} required="required" />
                                    <label>Password</label>
                                    <div className="bar"></div>
                                    {/* <span className="error"> Password is Required </span> */}
                                </div>
                                <div className="button-container">
                                    <input type="submit" value="Submit" />
                                </div>
                            </form >
                            {this.state.showDetails ? (<div className="displayLoginScreen">
                                <h3> Current User </h3>
                                <p> {this.state.email} </p>
                                <p> {this.state.password} </p>
                            </div>) : null }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent;