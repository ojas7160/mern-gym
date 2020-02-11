import React, { Component } from "react";
import "./ProfileComponent.css";
import * as userService from "../../services/users-service/userService";
import { Container, Row, Col } from "react-bootstrap";

class profile extends Component {
  profile = {};
  state = {
    user: {}
  };
  componentWillMount() {}

  componentDidMount() {
    this.profile = JSON.parse(userService.default.getItem("loginUser"));
    console.log(this.profile);
    this.setState({ user: this.profile });
  }

  render() {
    return (
      <div className="bg-white full-height">
        <div className="padding-10">
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
                  <span> {this.state.user.membershipNumber}</span>
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
        </div>
      </div>
    );
  }
}

export default profile;
