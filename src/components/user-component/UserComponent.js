import React, { Component } from 'react';
import Axios from '../../axios-instance';

class User extends Component {
  state = {user: null}
  
  componentDidMount() {
    const userId = this.props.match.params.id
    Axios.get('api/user/getUser/'+userId)
    .then(response => {
      console.log(response)
      this.setState({user: response.data.user})
    })
  }

  updateUser = (id) => {
    let reqBody;
    Axios.put('api/user/updateUser/'+id, reqBody)
    .then(response => {
      console.log(response);
    })
  }
  
  render() {
    return (
      <div>
        { this.state.user ? 
        (<div>
          <label>Active</label> : <span>{this.state.user.active}</span><br/>
          <label>Name</label> : <span>{this.state.user.name}</span><br/>
          <label>Membership Number</label> : <span>{this.state.user.membershipNumber}</span><br/>
          <label>Phone</label> : <span>{this.state.user.phone}</span><br/>
          <label>Address</label> : <span>{this.state.user.address}</span><br/>
          <label>Email</label> : <span>{this.state.user.email}</span><br/>
          <label>Fees Date</label> : <span>{this.state.user.feesSubmissionDate}</span><br/>
          <label>Due Date</label> : <span>{this.state.user.feesSubmissionDate}</span>
        </div>)
        
        : null}
        </div>
      )
      
  }
}

export default User;