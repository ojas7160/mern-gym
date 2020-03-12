// import React, { Component } from "react";
// import "./register-component.css";
// import Axios from "../../axios-instance";
// import toastr from "toastr";
// import { withRouter } from 'react-router-dom';
// import * as userService from '../../services/users-service/userService';

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
// 			user: {
// 				name: "",
// 				membershipNumber: "",
// 				email: "",
// 				password: "",
// 				admissionType: "",
// 				feesSubmissionDate: '',
// 				phone: "",
//         address: "",
//         imagePath: ''
//       },
//       edit: false,
//       userId: ''
//     };
//     this.changeName = this.changeName.bind(this);
//     this.changeMembershipNo = this.changeMembershipNo.bind(this);
//     this.changeEmail = this.changeEmail.bind(this);
//     this.changePassword = this.changePassword.bind(this);
//     this.changeAdmissionType = this.changeAdmissionType.bind(this);
//     this.changeFee = this.changeFee.bind(this);
//     this.changePhone = this.changePhone.bind(this);
//     this.changeAddress = this.changeAddress.bind(this);
//     this.resetForm = this.resetForm.bind(this);
//     this.onUserRegister = this.onUserRegister.bind(this);

//     this.form = new FormData();
// 	}
	
// 	componentDidMount() {
//     if(this.props.match.params.id) {
//       this.setState({edit: true, userId: this.props.match.params.id});
//       // debugger;
//       console.log(this.state)
//       userService.default.getUser(this.props.match.params.id)
//       .then(response => {
//         console.log(response)
//         this.setState(prevState => {return {...this.state, user: response.data.user} })
//         console.log(this.state)
//       })
//     }
// 	}

//   changeName(event) {
//     this.setState({ user: { ...this.state.user, name: event.target.value }});
//   }

//   changeMembershipNo(event) {
//     this.setState({ user: { ...this.state.user, membershipnumber: event.target.value }});
//   }

//   changeEmail(event) {
//     this.setState({ user: { ...this.state.user, email: event.target.value }});
//   }

//   changePassword(event) {
//     this.setState({ user: { ...this.state.user, password: event.target.value }});
//   }

//   changeAdmissionType(event) {
//     this.setState({ user: { ...this.state.user, admissionType: event.target.value }});
//   }

//   changeFee(event) {
//     this.setState({ user: { ...this.state.user, feesSubmissionDate: event.target.value }});
//   }

//   changeIsActive(event) {
//     this.setState({ user: { ...this.state.user, isActive: event.target.value }});
//   }

//   changePhone(event) {
//     this.setState({ user: { ...this.state.user, phone: event.target.value }});
//   }

//   changeAddress(event) {
//     this.setState({ user: { ...this.state.user, address: event.target.value }});
//   }

//   changeImage = (event) => {
//     let images = event.target.files ? Array.from(event.target.files) : []
//     console.log(event.target.files[0].name)
//     console.log(images)
    
//     images.forEach((file, i) => {
//       console.log(file, i)
//       this.form.append('file', file);
//     })
//     console.log(this.form)
    
//     // this.setState({user: { ...this.state.user, image: event.target.files[0].name}})
//   }

//   resetForm(event) {
//     // this.setState({
//     //   name: "",
//     //   membershipNumber: "",
//     //   email: "",
//     //   password: "",
//     //   admissionType: "",
//     //   feesSubmissionDate: "",
//     //   isActive: "",
//     //   phone: "",
//     //   address: ""
//     // });
//   }

//   onUserRegister(event) {
//     console.log("TCL: Register -> onUserRegister -> event", event)
//     // console.log({ name: this.state.user.name, membershipnumber: this.state.user.membershipnumber, email: this.state.user.email, password: this.state.user.password, admissionType: this.state.user.admissionType, fee: this.state.user.fee, isActive: this.state.user.isActive, phone: this.state.user.phone, address: this.state.user.address });
//     this.form.append('name', this.state.user.name);
//     this.form.append('membershipNumber', this.state.user.membershipNumber);
//     this.form.append('email', this.state.user.email);
//     this.form.append('admissionType', this.state.user.admissionType);
//     this.form.append('phone', this.state.user.phone);
//     this.form.append('address', this.state.user.address);
//     this.form.append('password', this.state.user.password);
//     this.form.append('feesSubmissionDate', this.state.user.feesSubmissionDate);
    
//     console.log(this.form)
//     Axios.post("/api/user/signup", this.form)
//       .then(res => {
//       console.log("TCL: Register -> onUserRegister -> res", res)
//         toastr.success(res.data.message, "Success!");
//         this.props.history.push("/login");
//       })
//       .catch(err => {
//         if (err.response) {
//           // toastr.error(err.response.data.error.errmsg, "Error");
//         }
//       });
//     event.preventDefault();
//   }

//   updateUser = (event) => {
//     Axios.put("/api/user/updateUser/"+this.state.userId, {
//       name: this.state.user.name,
//       membershipNumber: this.state.user.membershipNumber,
//       email: this.state.user.email,
//       admissionType: this.state.user.admissionType,
//       feesSubmissionDate: this.state.user.feesSubmissionDate,
//       phone: this.state.user.phone,
//       address: this.state.user.address,
//       imagePath: this.state.user.imagePath
//     })
//     .then(res => {
//       console.log(res)
//       toastr.success(res.data.message, "Success!");
//       // this.props.history.push("/login");
//     })
//     .catch(err => {
//       if (err.response) {
//         toastr.error(err.response.data.error.errmsg, "Error");
//       }
//     });
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div className="fullHeight">
//         <div className="login-wrapper">
//           <div className="container">
//             <div className="card"></div>
//             <div className="card">
//               <h1 className="title">{this.state.edit ? 'Update User' : 'Register'}</h1>
//               <form onSubmit={this.state.edit ? this.updateUser : this.onUserRegister}>
//                 <div className="input-container">
//                   {this.state.user.imagePath ? (<img src={this.state.user.imagePath} alt="profile pic" height="200px" width='200px' />) : (<input
//                     type="file"
//                     name="image"
//                     value={(this.state.user.imagePath && this.state.user.imagePath.length) ? this.state.user.imagePath : ''}
//                     onChange={this.changeImage}
//                   />)}
//                   <label>Profile Picture</label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="text"
//                     name="name"
//                     value={this.state.user.name}
//                     onChange={this.changeName}
                    
//                   />
//                   <label>Name</label>
//                   <div className="bar"></div>
//                 </div>

//                 <div className="input-container">
//                   <input
//                     type="number"
//                     name="membershipnumber"
//                     value={this.state.user.membershipNumber}
//                     onChange={this.changeMembershipNo}
//                   />
//                   <label>Membership Number</label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="email"
//                     name="email"
//                     value={this.state.user.email}
//                     onChange={this.changeEmail}
                    
//                   />
//                   <label>Email</label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     name="password"
//                     value={this.state.user.password}
//                     onChange={this.changePassword}
                    
//                   />
//                   <label>Password</label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <select
//                     value={this.state.user.admissionType}
//                     onChange={this.changeAdmissionType}
//                   >
//                     <option value="" name="admissionType" disabled>
//                       Admission Type
//                     </option>
//                     <option value="annually"> Annualy </option>
//                     <option value="quarterly"> Quarterly </option>
//                     <option value="monthly"> Monthly </option>
//                   </select>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="date"
//                     name="fee"
//                     value={this.state.user.feesSubmissionDate}
//                     onChange={this.changeFee}
                    
//                   />
//                   <label> Fee Submission Date </label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={this.state.user.phone}
//                     onChange={this.changePhone}
                    
//                   />
//                   <label> Phone </label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="text"
//                     name="address"
//                     value={this.state.user.address}
//                     onChange={this.changeAddress}
                    
//                   />
//                   <label> Address </label>
//                   <div className="bar"></div>
//                 </div>
//                 <div className="button-container">
//                   <input
//                     type="submit"
//                     value={this.state.edit ? 'Update' : 'Register'}
//                     style={{ marginRight: "15px" }}
//                   />
//                   <input type="reset" value="Reset" onClick={this.resetForm} />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default withRouter(Register);
// // (axiosInterceptor(Register, Axios))

import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Axios from "../../axios-instance";
import toastr from "toastr";
import { 
  FormControl,
  InputLabel,
  Select } from '@material-ui/core';
import 'date-fns';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router-dom';
import * as userService from '../../services/users-service/userService';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const SignUp = (props) => {
  const classes = useStyles();
  let form = new FormData();

  const [edit, changeEdit] = useState(false);
  const [age, changeAge] = useState(0);
  const [state, setState] = useState(
    { email: '',
    password: '',
    feesSubmissionDate: new Date(),
    name: '',
    admissionType: '',
    phone: '',
    address: '',
    membershipNumber: '',
    imagePath: '',
    userId: '' }
  )
  
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  useEffect(() => {
    if(props.match.params.id) {
      changeEdit(true)
      setState({...state, userId: props.match.params.id})
      userService.default.getUser(props.match.params.id)
      .then(response => {
        console.log(response)
        response.data.user.feesSubmissionDate = new Date(response.data.user.feesSubmissionDate)
        setState(response.data.user)
        // this.setState(prevState => {return {...this.state, user: response.data.user} })
        console.log(state)
      })
    } else {
      changeEdit(false);
      setState({})
    }
  }, [])
  const handleDataChange = (event, input) => {
    input == 'feesSubmissionDate' ? setState({...state, [input]: event}) : setState({...state, [input]: event.target.value});
  };

  const handleChange = (input) => {
    console.log(input)
  }

  const onUserRegister = (event) => {
    console.log("TCL: Register -> onUserRegister -> event", event)
    // console.log({ name: this.state.user.name, membershipnumber: this.state.user.membershipnumber, email: this.state.user.email, password: this.state.user.password, admissionType: this.state.user.admissionType, fee: this.state.user.fee, isActive: this.state.user.isActive, phone: this.state.user.phone, address: this.state.user.address });
    form.append('name', state.name);
    form.append('email', state.email);
    form.append('admissionType', state.admissionType);
    form.append('phone', state.phone);
    form.append('address', state.address);
    form.append('password', state.password);
    form.append('feesSubmissionDate', state.feesSubmissionDate);
    
    Axios.post("/api/user/signup", form)
      .then(res => {
      console.log("TCL: Register -> onUserRegister -> res", res)
        toastr.success(res.data.message, "Success!");
        props.history.push("/login");
      })
      .catch(err => {
        if (err.response) {
          // toastr.error(err.response.data.error.errmsg, "Error");
        }
      });
    event.preventDefault();
  }

  const updateUser = (event) => {
    Axios.put("/api/user/updateUser/"+ props.match.params.id, {
      name: state.name,
      email: state.email,
      admissionType: state.admissionType,
      feesSubmissionDate: state.feesSubmissionDate,
      phone: state.phone,
      address: state.address,
      imagePath: state.imagePath
    })
    .then(res => {
      console.log(res)
      toastr.success(res.data.message, "Success!");
      // this.props.history.push("/login");
    })
    .catch(err => {
      if (err.response) {
        toastr.error(err.response.data.error.errmsg, "Error");
      }
    });
    event.preventDefault();
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {edit ? 'Update' : 'Register'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={edit ? updateUser : onUserRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={state.name}
                onChange={($event) => handleDataChange($event, 'name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                id="membershipNumber"
                label="Membership Number"
                name="membershipNumber"
                autoComplete="lname"
                value={state.membershipNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={($event) => handleDataChange($event, 'email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={state.password}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  inputVariant="outlined"
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Fees submission"
                  style={{width: '100%'}}
                  value={state.feesSubmissionDate}
                  onChange={($event) => handleDataChange($event, 'feesSubmissionDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl} style={{width: '100%'}}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                  Age
                </InputLabel>
                <Select
                  native
                  value={state.admissionType}
                  onChange={($event) => handleDataChange($event, 'admissionType')}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value="" name="admissionType" disabled>
                    Admission Type
                  </option>
                  <option value="annually"> Annualy </option>
                  <option value="quarterly"> Quarterly </option>
                  <option value="monthly"> Monthly </option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
                value={state.phone}
                onChange={($event) => handleDataChange($event, 'phone')}
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                value={state.address}
                onChange={($event) => handleDataChange($event, 'address')}
                autoComplete="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {edit ? 'Update' : 'Sign up' }
          </Button>
          { !edit ? (<Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>) : null }
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);
