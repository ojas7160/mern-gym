import React, { Component } from 'react';
import Axios from '../../axios-instance';
// import { JsonToExcel } from 'react-json-excel';
import DashboardBodyComponent from '../../components/dashboard-body/DashboardBodyComponent';
import ExportToExcel from '../../components/export-to-excel/exportToExcelComponent';
// import * as CanvasJSReact from '../../assets/canvas/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { withRouter } from 'react-router-dom';
import * as userService from '../../services/users-service/userService';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    }
  }

  componentDidMount(){
    this.getAllUsers();
  }

  getAllUsers(){
    userService.default.getAllUsers()
    .then(res => {
      let students = res.data.users.map(student => {
        return {
          name: student.name,
          membershipNumber: student.membershipNumber,
          phone: student.phone,
          address: student.address,
          email: student.email,
          id: student._id,
          active: student.active
        }
      })
      this.setState({students: students});
    }, err => {

    })
  }

  exportToExcel = () => {
    
  }

  openUser = (id) => {
    // console.log(id)
    this.props.history.push('/users/'+id);
    // return (<Redirect to={{pathname: '/users', state: {id: id, edit: true}}} />)
  }

  render() {
    return (
      <div className="fullHeight">
        <div className="row">
          <div className="col-md-12">
            <div className="main-card mb-3 card" style={{ height: 'auto' }}>
              <div className="card-header">Active Users
              </div>
              <div className="table-responsive" style={{ overflow: 'visible', textAlign: 'left' }}>
                <DashboardBodyComponent students={this.state.students} openUser={(id) => this.openUser(id)} />
              </div>
              <div className="d-block text-center card-footer">
                {/* <button className="btn-wide btn btn-success" onClick={this.exportToExcel}> Export to Excel </button> */}
                <ExportToExcel />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(DashboardComponent);