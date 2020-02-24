import React, { useState, useEffect } from 'react';
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
  let loginService;
  var self = this;

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

  useEffect(() => {
    // return loginService.unsubscribe();
  })
  const handleSubmit = (event) => {
    self.loginService = userService.default.loginUser({email: email, password: password})
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