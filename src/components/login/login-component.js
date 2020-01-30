import React, { Component } from 'react';
import './login-component.css';
import Axios from '../../axios-instance';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
<<<<<<< HEAD
        this.state = { 
            email: null, 
            password: '' , 
            showDetails: false,
            emailValid: true
        };
=======
        this.state = { email: '', password: '' , showDetails: false, userDetail: {email: '', password: ''}};
>>>>>>> f7ad45660b51733cd4676b31dfe6909eca90fd0c

        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

<<<<<<< HEAD
    onchangeEmail(event) {        
        this.setState({ email: event.target.value },()=>{
            this.setState({emailValid: this.state.email.length ? true : false})
            // this.emailValid = this.state.email.length ? true : false
        });
=======
    onchangeEmail(event) {
        this.setState({ email: event.target.value });
        if(!event.target.value.length) {
            this.setState({showDetails: false})
        }
>>>>>>> f7ad45660b51733cd4676b31dfe6909eca90fd0c
    }

    onchangePassword(event) {
        this.setState({ password: event.target.value });
        if(!event.target.value.length) {
            this.setState({showDetails: false})
        }
    }

    handleSubmit(event) {
<<<<<<< HEAD
        this.user = {};
        this.user.email = this.state.email;
        this.user.password  = this.state.password;
        console.log(this.user);
        this.setState({showDetails:true})
=======
        console.log('A name was submitted:', this.state.email, this.state.password);
        this.setState((prevState) => {
            return {showDetails: true, userDetail: {email: prevState.email, password: prevState.password}}
        })

        Axios.post('/api/user/login', {email: this.state.email, password: this.state.password})
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
>>>>>>> f7ad45660b51733cd4676b31dfe6909eca90fd0c
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
                            { (this.state.showDetails) ? (<div className="displayLoginScreen">
                                <h3> Current User </h3>
<<<<<<< HEAD
                                <p> {this.user.email} </p>
                                <p> {this.user.password} </p>
=======
                                <p> {this.state.userDetail.email} </p>
                                <p> {this.state.userDetail.password} </p>
>>>>>>> f7ad45660b51733cd4676b31dfe6909eca90fd0c
                            </div>) : null }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent;