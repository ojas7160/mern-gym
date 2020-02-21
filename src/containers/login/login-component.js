// import React, { Component } from 'react';
// import './login-component.css';
// import Axios from '../../axios-instance';
// import toastr from 'toastr';
// import FontAwesome from 'react-fontawesome'
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';


// class LoginComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { email: '', password: '' , showDetails: false, emailValid:true, passwordValid: true, userDetail: {email: '', password: ''}, showPassword: false, authed: localStorage.getItem('token')};

//         this.onchangeEmail = this.onchangeEmail.bind(this);
//         this.onchangePassword = this.onchangePassword.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         console.log(this.props)
//     }

//     onchangeEmail(event) {
//         this.setState({ email: event.target.value });
//         if (!event.target.value.length) {
//             this.setState({ showDetails: false, emailValid: false })
//         }
//         else {
//             this.setState({ emailValid: true })
//         }
//     }

//     onchangePassword(event) {
//         this.setState({ password: event.target.value });
//         if (!event.target.value.length) {
//             this.setState({ showDetails: false, passwordValid: false })
//         }
//         else {
//             this.setState({ passwordValid: true })
//         }
//     }

//     handleSubmit(event) {
//         this.setState((prevState) => {
//             return { showDetails: true, userDetail: { email: prevState.email, password: prevState.password } }
//         })

//         Axios.post('/api/user/login', { email: this.state.email, password: this.state.password })
//             .then((res) => {
//                 toastr.success(res.data.message, 'Success!');
//                 localStorage.setItem('loginUser', JSON.stringify(res.data.user));
//                 localStorage.setItem('token', res.data.token)
//                 this.props.onLogin(localStorage.getItem('token'));
//                 this.props.history.push('/dashboard')
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     toastr.error(err.response.data.message, 'Error');
//                 }
//             })
//         event.preventDefault();
//     }

//     resetForm = () => {
//         this.setState({ email: "", password: "", showDetails: false, emailValid: true, passwordValid: true })
//     }
//     showPassword = () => {
//         this.setState(prevState => { return { showPassword: !prevState.showPassword } })
//     }

//     render() {
//         return (
//             <div className="fullHeight">
//                 <div className="login-wrapper">
//                     <div className="container">
//                         <div className="card"></div>
//                         <div className="card">
//                             <h1 className="title">Login</h1>
//                             <form onSubmit={this.handleSubmit}>
//                                 <div className="input-container">
//                                     <input type="email" name="email" value={this.state.email} onChange={this.onchangeEmail} required />
//                                     <label>Email</label>
//                                     <div className="bar"></div>
//                                     {this.state.emailValid ? null : (<span className="error"> Email Address is Required </span>)}
//                                 </div>
//                                 <div className="input-container">
//                                     <input type={this.state.showPassword ? 'text' : 'password'} name="password" value={this.state.password} onChange={this.onchangePassword} required="required" />
//                                     <label>Password</label>
//                                     {this.state.password ? 
//                                     <FontAwesome
//                                         className="passwordFieldIcon"
//                                         name={this.state.showPassword ? 'eye-slash' : 'eye'}
//                                         onClick={this.showPassword}
//                                         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
//                                     />
//                                     : null}
//                                     <div className="bar"></div>
//                                     {this.state.passwordValid ? null : (<span className="error"> Password is Required </span>)}
//                                 </div>
//                                 <div className="button-container">
//                                     <input type="submit" value="Login" style={{ marginRight: '15px' }} disabled={!this.state.emailValid} />
//                                     <input type="reset" value="Reset" onClick={this.resetForm} />
//                                 </div>
//                             </form>
//                             {(this.state.showDetails) ? (<div className="displayLoginScreen">
//                                 <h3> Entered Details </h3>
//                                 <p> {this.state.userDetail.email} </p>
//                                 <p> {this.state.userDetail.password} </p>
//                             </div>) : null}
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// // const mapStateToProps = state => {
// //     return {
// //         ctr: state.counter.counter,
// //         storedResults: state.result.results
// //     };
// // }

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogin: (authed) => dispatch({type: 'LOGIN', authed: authed})
//         // onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
//         // onAdditionCounter: () => dispatch({type: 'ADDITION', value: 5, name: 'Ojas'}),
//         // onSubtractionCounter: () => dispatch({type: 'SUBTRACTION', value: 5}),
//         // onStoreResult: (result) => dispatch({type: 'STORE_RESULT', result: result}),
//         // onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultId: id})
//     }
// }
// export default connect(null, mapDispatchToProps)(withRouter(LoginComponent));



import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; 
import SideImage from '../../assets/Gym-background-Small.jpg';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userService from '../../services/users-service/userService';

const LoginComponent = (props) => {
      
  // constructor(props) {
  //   super(props)
  //   this.state = { email: '', password: '' , showDetails: false, emailValid:true, passwordValid: true, userDetail: {email: '', password: ''}, showPassword: false, authed: localStorage.getItem('token')};

  //   this.onchangeEmail = this.onchangeEmail.bind(this);
  //   this.onchangePassword = this.onchangePassword.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   console.log(this.props)
  // }
  
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${SideImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  
  // const changeEmail = (event) => {
  //   this.setState({ email: event.target.value });
  //   if (!event.target.value.length) {
  //       this.setState({ showDetails: false, emailValid: false })
  //   }
  //   else {
  //       this.setState({ emailValid: true })
  //   }
  // }

  // const onchangePassword = (event) => {
  //   this.setState({ password: event.target.value });
  //   if (!event.target.value.length) {
  //       this.setState({ showDetails: false, passwordValid: false })
  //   }
  //   else {
  //       this.setState({ passwordValid: true })
  //   }
  // }

  const handleSubmit = (event) => {
    // this.setState((prevState) => {
    //     return { showDetails: true, userDetail: { email: prevState.email, password: prevState.password } }
    // })
    userService.default.loginUser({email: email, password: password})
    .then((res) => {
      toastr.success(res.data.message, 'Success!');
      localStorage.setItem('loginUser', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token)
      props.onLogin(localStorage.getItem('token'));
      props.history.push('/dashboard')
    })
    .catch((err) => {
      if (err.response) {
          toastr.error(err.response.data.message, 'Error');
      }
    })
    
    event.preventDefault();
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={($event) => changeEmail($event.target.value)}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={($event) => changePassword($event.target.value)}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={($event) => handleSubmit($event)}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

// const mapStateToProps = state => {
//     return {
//         ctr: state.counter.counter,
//         storedResults: state.result.results
//     };
// }

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authed) => dispatch({type: 'LOGIN', authed: authed})
        // onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        // onAdditionCounter: () => dispatch({type: 'ADDITION', value: 5, name: 'Ojas'}),
        // onSubtractionCounter: () => dispatch({type: 'SUBTRACTION', value: 5}),
        // onStoreResult: (result) => dispatch({type: 'STORE_RESULT', result: result}),
        // onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultId: id})
    }
}
export default connect(null, mapDispatchToProps)(withRouter(LoginComponent));