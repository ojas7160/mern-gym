import React, { Component } from 'react';
import './login-component.css';
import Axios from '../../axios-instance';
import toastr from 'toastr';


class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '' , showDetails: false, emailValid:false, userDetail: {email: '', password: ''}, showPassword: false};

        this.onchangeEmail = this.onchangeEmail.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onchangeEmail(event) {
        this.setState({ email: event.target.value });
        if(!event.target.value.length) {
            this.setState({showDetails: false, emailValid:false})
        }
        else{
            this.setState({emailValid:true})
        }
    }

    onchangePassword(event) {
        this.setState({ password: event.target.value });
        if(!event.target.value.length) {
            this.setState({showDetails: false})
        }
    }

    handleSubmit(event) {
        this.setState((prevState) => {
            return {showDetails: true, userDetail: {email: prevState.email, password: prevState.password}}
        })

        Axios.post('/api/user/login', {email: this.state.email, password: this.state.password})
		.then((res) => {
            toastr.success(res.statusText, 'Success!');
            localStorage.setItem('loginUser', res.data.user.email);
            localStorage.setItem('token', res.data.token)
            this.props.history.push('/dashboard')
		})
		.catch((err) => {
            if(err.response){
                toastr.error(err.response.data.message, 'Error');
            }
		})
        event.preventDefault();
    }

    resetForm = () => {
        this.setState({email:"",password:"", showDetails: false})
    }
    showPassword = () => {
        this.setState(prevState => {return {showPassword: !prevState.showPassword}})
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
                                    <input type={this.state.showPassword ? 'text' : 'password'} name="password" value={this.state.password} onChange={this.onchangePassword} required="required" />
                                    <label>Password</label>
                                    <span style={{cursor: 'pointer'}} onClick={this.showPassword}>{this.state.showPassword ? 'Hide' : 'Show'}</span>
                                    <div className="bar"></div>
                                    {/* <span className="error"> Password is Required </span> */}
                                </div>
                                <div className="button-container">
                                    <input type="submit" value="Login" style={{marginRight:'15px'}} disabled={!this.state.emailValid} />
                                    <input type="reset" value="Reset" onClick={this.resetForm}/>
                                </div>
                            </form>
                            { (this.state.showDetails) ? (<div className="displayLoginScreen">
                                <h3> Entered Details </h3>
                                <p> {this.state.userDetail.email} </p>
                                <p> {this.state.userDetail.password} </p>
                            </div>) : null }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default LoginComponent;