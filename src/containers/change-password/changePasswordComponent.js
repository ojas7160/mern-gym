import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './changePasswordComponent.css';
import * as userService from '../../services/users-service/userService';
import Loader from '../../components/loaderComponent/loader-component';

class changePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    id: '',
    confirmPasswordMatch: true,
    submit: false
  }
  changePassword = () => {
    if(this.state.newPassword !== this.state.confirmPassword) return;
    this.setState({submit : true})
    userService.default.changePassword(this.state)
    .then(response => {
      this.setState({submit : false})      
    })
  }

  componentDidMount() {
    let user = JSON.parse(userService.default.getItem('loginUser'))
    this.setState({id: user._id})
  }

  changeInput = (type, event) => {
    this.setState({[type]: event.target.value})    
  }
  render() {
    return (
      <div className="change-password">
        <Container>
          <Row>
            <h2>Change Password</h2>
            <Col md={{span: 8, offset: 4}}>
              <Form>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control value={this.state.oldPassword} onChange={($event) => this.changeInput('oldPassword', $event)} type="password" placeholder="Old Password" />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control value={this.state.newPassword} onChange={($event) => this.changeInput('newPassword', $event)} type="password" placeholder="New Password" />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control value={this.state.confirmPassword} onChange={($event) => this.changeInput('confirmPassword', $event)} type="password" placeholder="Confirm Password" />
                </Form.Group>

                {!this.state.submit ? (<Button onClick={this.changePassword} variant="primary">
                  Submit
                </Button>) : <Loader />}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default changePassword;