import React, { Component } from "react";
import "./ProfileComponent.css";
import * as userService from "../../services/users-service/userService";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
// import * as userService  from '../../services/users-service/userService';

class profile extends Component {
  profile = {};
  state = {
    user: {},
    edit: false,
    showModal: false
  };
  form = new FormData();
  componentWillMount() {}

  componentDidMount() {
    this.profile = JSON.parse(userService.default.getItem("loginUser"));
    this.setState({ user: this.profile });
    this.setState({user: {...this.profile, feesSubmissionDate:  moment(new Date(this.profile.feesSubmissionDate)).format("DD-MMM-YYYY"), dueDate: moment(new Date(this.profile.dueDate)).format("DD-MMM-YYYY"), displayFeesDate: new Date(this.profile.feesSubmissionDate)}})
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

  changeInput = (type, event) => {
    this.setState({user: {...this.state.user, [type]: event.target.value}})
  }

  // changeMno = (event) => {
  //   this.setState({user: {...this.state.user, membershipNumber: event.target.value}})
  // }

  // changePhone = (event) => {
  //   this.setState({user: {...this.state.user, phone: event.target.value}})
  // }

  // changeAddress = (event) => {
  //   this.setState({user: {...this.state.user, address: event.target.value}})
  // }

  // changeName = (event) => {
  //   this.setState({user: {...this.state.user, name: event.target.value}})
  // }

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

  toggleModal = (show) => {
    this.setState({showModal: show})
  }

  render() {
    return (
      <div className="bg-white full-height">
        <div className="padding-10">
          <h1 className="text-center">My Profile</h1>
          <FontAwesome
            onClick={this.state.edit ? this.cancel : this.changeEdit}
            name={this.state.edit ? "times" : "edit"}
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', float: 'right',
            marginLeft: '10px',
            fontSize: '20px' }} />
          {/* {!this.state.edit ? ( */}
            <Container>
              <Row className="form-design p-0">
                <Col md={4}>
                  <div>
                    <img
                      src={this.state.user.imagePath}
                      alt="profile pic"
                      style={{width: '100%'}}
                    />
                  </div>
                </Col>
                <Col md={8}>
                  {!this.state.edit ? (<h2 className="text-left">{this.state.user.name}</h2>) : 
                  (<Form.Control value={this.state.user.name} onChange={($event) => this.changeInput('name', $event)} type="text" placeholder="Name" />)}
                  <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="4">
                        Email:
                      </Form.Label>
                      <Col sm="8">
                        {!this.state.edit ? (<Form.Control plaintext readOnly defaultValue={this.state.user.email} />) : 
                        (<Form.Control value={this.state.user.email} onChange={($event) => this.changeInput('email', $event)} type="email" placeholder="Enter email" />)}
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Phone:
                      </Form.Label>
                      <Col sm="8">
                        {!this.state.edit ? <Form.Control plaintext readOnly defaultValue={this.state.user.phone} /> :
                        <Form.Control value={this.state.user.phone} onChange={($event) => this.changeInput('phone', $event)} placeholder="999888.." />}
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Status:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue={this.state.user.active ? 'Active' : 'Pending'} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Gender:
                      </Form.Label>
                      <Col sm="8">
                        {!this.state.edit ? <Form.Control plaintext readOnly defaultValue={this.state.user.gender || 'Male'} /> :
                        (<Form.Control as="select" value={this.state.user.gender} onChange={($event) => this.changeInput('gender', $event)}>
                          <option value="select">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Control>)}
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Membership Number:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue={this.state.user.membershipNumber} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Address:
                      </Form.Label>
                      <Col sm="8">
                        {!this.state.edit ? <Form.Control plaintext readOnly defaultValue={this.state.user.address} /> : 
                        <Form.Control value={this.state.user.address} onChange={($event) => this.changeInput('address', $event)} placeholder="1234 Main St" />}
                      </Col>
                    </Form.Group>

                    

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Fees Submission Date:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue={this.state.user.feesSubmissionDate} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="4">
                        Fees Due Date:
                      </Form.Label>
                      <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue={this.state.user.dueDate} />
                      </Col>
                    </Form.Group>
                  </Form>
                  {this.state.edit ? 
                  <Button variant="primary" onClick={this.save}>Save</Button> : null}
                </Col>
                
              </Row>
              
            </Container>
            {/* // ) : ( */}

            {/* <EditFormComponent setLgShow={(show) => this.toggleModal(show)} lgShow={this.state.showModal} user={this.state.user} changeInput={this.changeInput}/>          */}
        </div>
      </div>
    );
  }
}

export default profile;
