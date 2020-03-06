import React, { Component } from 'react';
// import { JsonToExcel } from 'react-json-excel';
import DashboardBodyComponent from '../../components/dashboard-body/DashboardBodyComponent';
import ExportToExcel from '../../components/export-to-excel/exportToExcelComponent';
import { withRouter } from 'react-router-dom';
import * as userService from '../../services/users-service/userService';
import debounce from 'lodash.debounce';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      page: 1,
      totalPages: 1
    }

    window.onscroll = debounce(() => {
      console.log('here')
      const {
        state: {
          error,
          isLoading,
          hasMore,
        }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      // if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      
      console.log(this.state.page)
      
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        this.setState(prevState => {
          return { page: prevState.page + 1}
        })
        if(this.state.totalPages >= this.state.page) {
          this.getAllUsers();
        }
      }
      
    }, 100);
  }

  componentDidMount(){
    this.getAllUsers();
  }

  getAllUsers(){
    // let page = 3
    userService.default.getAllUsers(this.state.page)
    .then(res => {
      let students = res.data.users.map(student => {
        return {
          name: student.name,
          membershipNumber: student.membershipNumber,
          phone: student.phone,
          address: student.address,
          email: student.email,
          id: student._id,
          active: student.active,
          imagePath: student.imagePath
        }
      })
      this.setState(prevState => { 
        students.push.apply(students, prevState.students)
        return {students: students, totalPages: res.data.totalPages} 
      });
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

              {/* <InfiniteScroll
                dataLength={this.state.students.length} //This is important field to render the next data
                next={this.getAllUsers}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                height={'500px'}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={this.getAllUsers}
                pullDownToRefresh
                pullDownToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                }> */}
                <DashboardBodyComponent students={this.state.students} openUser={(id) => this.openUser(id)} />
              {/* </InfiniteScroll> */}
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