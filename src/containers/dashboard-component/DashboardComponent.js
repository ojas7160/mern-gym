import React, { Component } from 'react';
import Axios from '../../axios-instance';
import DashboardBodyComponent from '../../components/dashboard-body/DashboardBodyComponent';

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
    Axios.get('/api/user/getAllUsers')
    .then(res => {
      this.setState({students: res.data.users});
    })
    .catch((err) => {
        if (err.response) {

        }
    })
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
                <DashboardBodyComponent students={this.state.students} />
              </div>
              <div className="d-block text-center card-footer">
                <button className="btn-wide btn btn-success"> Export to Excel </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardComponent;