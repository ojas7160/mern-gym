import React, { Component } from 'react';
import Axios from '../../axios-instance';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    }
  }

  tableHeader = [];
  tableBody = [];

  renderTableData = () => {
    this.state.students.map((student) => {
      return 
        <tr key={student._id}>
          <td>{student._id}</td>
          <td>{student.name}</td>
          <td> 21 </td>
          <td>{student.status === 1 ? <div className="badge badge-success"> Active </div> : <div className="badge badge-warning"> In Active </div>}</td>
          <td>{student.email}</td>
        </tr>
      
    })
    
  }

  // renderTableHeader() {
  //   let header = Object.keys(this.state.students[0])
  //   return header.map((key, index) => {
  //     this.tableHeader.push( <th key={index}>{key.toUpperCase()}</th>)
  //   })
  // }

  componentDidMount(){
    this.getAllUsers();
  }

  getAllUsers(){
    Axios.get('/api/user/getAllUsers')
    .then(res => {
      this.setState({students:res.data.users});
      // this.renderTableHeader();
      // this.renderTableData();
      console.log(this.state.students);
    })
    // .then(json => {
    //   json.map(obj => this.setState({ students: Object.values(obj) }))
    // })
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
                <table className="align-left mb-0 table table-borderless table-striped table-hover">
                  {/* <thead>
                    <tr>{this.tableHeader}</tr>
                  </thead> */}
                  <tbody>

                    {/* <tr>
                      <td className="text-left text-muted">#345</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">

                            <div className="widget-content-left flex2">
                              <div className="widget-heading">John Prashad Jha</div>

                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-left">Madrid</td>
                      <td className="text-left">
                        <div className="badge badge-warning">Pending</div>
                      </td>
                      <td className="text-left">
                        <button type="button" id="PopoverCustomT-1" className="btn btn-primary btn-sm">Details</button>
                      </td>

                      
                    </tr> */}
                    {this.renderTableData}

                  </tbody>
                </table>
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