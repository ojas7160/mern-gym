import React, { Component } from 'react';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        { id: 1, name: 'Wasif', age: 21, status: 1, email: 'wasif@email.com' },
        { id: 2, name: 'Ali', age: 19, status: 1, email: 'ali@email.com' },
        { id: 3, name: 'Saad', age: 16, status: 0, email: 'saad@email.com' },
        { id: 4, name: 'Asad', age: 25, status: 1, email: 'asad@email.com' }
      ]
    }
  }

  renderTableData() {
    return this.state.students.map((student) => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.age}</td>
          <td>{student.status === 1 ? <div className="badge badge-success"> Active </div> : <div className="badge badge-warning"> In Active </div>}</td>
          <td>{student.email}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
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
                  <thead>
                    <tr>{this.renderTableHeader()}</tr>
                  </thead>
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
                    {this.renderTableData()}

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