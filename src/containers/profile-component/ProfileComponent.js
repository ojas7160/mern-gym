import React, { Component } from "react";
import "./ProfileComponent.css";
import * as userService from "../../services/users-service/userService";
import { Row, Col, Button } from "react-bootstrap";
import moment from 'moment';
import Datepicker from '../../components/Date-picker/DatePickerComponent';
// import * as userService  from '../../services/users-service/userService';

class profile extends Component {
  profile = {};
  state = {
    user: {},
    edit: false
  };
  form = new FormData();
  componentWillMount() {}

  componentDidMount() {
    this.profile = JSON.parse(userService.default.getItem("loginUser"));
    this.setState({ user: this.profile });
    this.setState({user: {...this.profile, feesSubmissionDate:  moment(new Date(this.profile.feesSubmissionDate)).format("DD-MMM-YYYY"), displayFeesDate: new Date(this.profile.feesSubmissionDate)}})
  }

  changeEdit = () => {
    this.setState(prevState => {
      return { edit: !prevState.edit}
    })
  }

  save = () => {
    for(var i in this.state.user) {
      this.form.append(i, this.state.user[i])
    }
    console.log(this.form)
    userService.default.updateProfile(this.state.user._id, this.form)
    .then(response => {
      console.log(response);
      this.setState(prevState => {
        return { edit: !prevState.edit}
      })
    })
  }

  changeMno = (event) => {
    this.setState({user: {...this.state.user, membershipNumber: event.target.value}})
  }

  changePhone = (event) => {
    this.setState({user: {...this.state.user, phone: event.target.value}})
  }

  changeAddress = (event) => {
    this.setState({user: {...this.state.user, address: event.target.value}})
  }

  changeName = (event) => {
    this.setState({user: {...this.state.user, name: event.target.value}})
  }

  changeImage = (event) => {
    let images = event.target.files ? Array.from(event.target.files) : []
    console.log(event.target.files[0].name)
    console.log(images)
    
    images.forEach((file, i) => {
      console.log(file, i)
      this.form.append('file', file);
    })
    console.log(this.form)
  }

  setStartDate = (value) => {
    console.log("TCL: handleChange -> value", value)
    this.setState({
      user: {...this.profile, feesSubmissionDate: moment(value).format("DD-MMM-YYYY"), displayFeesDate: value } // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  cancel = () => {
    this.setState({edit: false})
  }

  render() {
    return (
      <div className="bg-white full-height">
        <div className="padding-10">
          <Button variant="primary" onClick={this.state.edit ? this.save : this.changeEdit}>{this.state.edit ? 'Save' : 'Edit'}</Button>
          <Button variant="danger" onClick={this.cancel}>cancel</Button>
          {!this.state.edit ? (
            <Row>
              <Col md={4}>
                <div>
                  <img
                    src={this.state.user.imagePath}
                    alt="profile pic"
                    height="80"
                    width="80"
                    className="border-radius-50"
                  />
                  <h3>{this.state.user.name}</h3>
                </div>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <label>MemberShip Number: </label>
                    <span>{this.state.user.membershipNumber}</span>
                  </Col>
                  <Col md={4}>
                    <label>Status: </label>
                    <span> {this.state.user.active ? 'Active' : 'Pending'}</span>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Address: </label>
                    <span> {this.state.user.address}</span>
                  </Col>
                  <Col md={4}>
                    <label>Phone: </label>
                    <span> {this.state.user.phone}</span>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Email: </label>
                    <span> {this.state.user.email}</span>
                  </Col>
                  <Col md={4}>
                    {/* <label>Phone: </label>
                    <span>{this.state.user.phone}</span> */}
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Fees Submission: </label>
                    <span> {this.state.user.feesSubmissionDate}</span>
                  </Col>
                  <Col md={4}>
                    <label>Due Date: </label>
                    <span> {this.state.user.dueDate}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            ) : (
            <Row>
              <Col md={4}>
                <div>
                  <input type="file" value={[]} onChange={this.changeImage} />
                  <input type="text" value={this.state.user.name} onChange={this.changeName} />
                </div>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <label>MemberShip Number: </label>
                    <input type="text" value={this.state.user.membershipNumber} onChange={this.changeMno}/>
                  </Col>
                  <Col md={4}>
                    <label>Status: </label>
                    <span> {this.state.user.active ? 'Active' : 'Pending'}</span>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Address: </label>
                    <input
                    type="text"
                    name="address"
                    value={this.state.user.address}
                    onChange={this.changeAddress}
                    
                  />
                  </Col>
                  <Col md={4}>
                    <label>Phone: </label>
                    <input
                    type="tel"
                    name="phone"
                    value={this.state.user.phone}
                    onChange={this.changePhone}
                    
                  />
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Email: </label>
                    <span> {this.state.user.email}</span>
                  </Col>
                  <Col md={4}>
                    {/* <label>Phone: </label>
                    <span>{this.state.user.phone}</span> */}
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Fees Submission: </label>
                    {/* {this.state.user.displayFeesDate} */}
                    {/* <DatePicker selected={this.state.user.displayFeesDate} onChange={date => this.setStartDate(date)} /> */}
                    <Datepicker getDate={this.state.user.displayFeesDate} setDate={(date) => this.setStartDate(date)}/>
                  </Col>
                  <Col md={4}>
                    <label>Due Date: </label>
                    <span> {this.state.user.dueDate}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            )}
            
        </div>
      </div>
    );
  }
}

export default profile;
