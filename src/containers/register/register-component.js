import React, { Component } from 'react';
import './register-component.css';
import Axios from '../../axios-instance';
import toastr from 'toastr';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', membershipnumber: '', email: '', password: '', admissionType: '', fee: '', isActive: '', phone: '', address: '' };
        this.changeName = this.changeName.bind(this);
        this.changeMembershipNo = this.changeMembershipNo.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeAdmissionType = this.changeAdmissionType.bind(this);
        this.changeFee = this.changeFee.bind(this);
        this.changeIsActive = this.changeIsActive.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.resetForm = this.resetForm.bind(this)
        
        this.onUserRegister = this.onUserRegister.bind(this);
    }

    changeName(event) {
        this.setState({ name: event.target.value })
    }

    changeMembershipNo(event) {
        this.setState({ membershipnumber: event.target.value })
    }

    changeEmail(event) {
        this.setState({ email: event.target.value })
    }

    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    changeAdmissionType(event) {
        this.setState({ admissionType: event.target.value })
    }

    changeFee(event) {
        this.setState({ fee: event.target.value })
    }

    changeIsActive(event) {
        this.setState({ isActive: event.target.value })
    }

    changePhone(event) {
        this.setState({ phone: event.target.value })
    }

    changeAddress(event) {
        this.setState({ address: event.target.value })
    }

    resetForm(event){
        this.setState({ name: '', membershipnumber: '', email: '', password: '', admissionType: '', fee: '', isActive: '', phone: '', address: '' });
    }


    onUserRegister(event) {
        // console.log({ name: this.state.name, membershipnumber: this.state.membershipnumber, email: this.state.email, password: this.state.password, admissionType: this.state.admissionType, fee: this.state.fee, isActive: this.state.isActive, phone: this.state.phone, address: this.state.address });

        Axios.post('/api/user/signup', {
            name: this.state.name,
            membershipNumber: this.state.membershipnumber,
            email: this.state.email,
            password: this.state.password,
            admissionType: this.state.admissionType,
            feesSubmissionDate: this.state.fee,
            active: this.state.isActive,
            phone: this.state.phone,
            address: this.state.address
        })
            .then((res) => {
                toastr.success(res.data.message, 'Success!');
                this.props.history.push('/login');
            })
            .catch((err) => {
                if (err.response) {                    
                    toastr.error(err.response.data.error.errmsg, 'Error');
                }
            })
        event.preventDefault();
    }



    render() {
        return (
            <div className="fullHeight">
                <div className="login-wrapper">
                    <div className="container">
                        <div className="card"></div>
                        <div className="card">
                            <h1 className="title">Register</h1>
                            <form onSubmit={this.onUserRegister}>
                                <div className="input-container">
                                    <input type="text" name="name" value={this.state.name} onChange={this.changeName} required />
                                    <label>Name</label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type="number" name="membershipnumber" value={this.state.membershipnumber} onChange={this.changeMembershipNo} />
                                    <label>Membership Number</label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type="email" name="email" value={this.state.email} onChange={this.changeEmail} required />
                                    <label>Email</label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type='password' name="password" value={this.state.password} onChange={this.changePassword} required />
                                    <label>Password</label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <select value={this.state.admissionType} onChange={this.changeAdmissionType}>
                                        <option value='' name="admissionType" disabled>Admission Type</option>
                                        <option value='annual'> Annualy </option>
                                        <option value='quarterly'> Quarterly </option>
                                        <option value='monthly'> Monthly </option>
                                    </select>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type='date' name="fee" value={this.state.fee} onChange={this.changeFee} required />
                                    <label> Fee Submission Date </label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <select value={this.state.isActive} onChange={this.changeIsActive}>
                                        <option value='' name="isActive" disabled> Active </option>
                                        <option value="1"> Yes </option>
                                        <option value="0"> No </option>
                                    </select>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type='tel' name="phone" value={this.state.phone} onChange={this.changePhone} required />
                                    <label> Phone </label>
                                    <div className="bar"></div>
                                </div>
                                <div className="input-container">
                                    <input type="text" name="address" value={this.state.address} onChange={this.changeAddress} required />
                                    <label> Address </label>
                                    <div className="bar"></div>
                                </div>
                                <div className="button-container">
                                    <input type="submit" value="Register" style={{ marginRight: '15px' }} />
                                    <input type="reset" value="Reset" onClick={this.resetForm} />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Register;