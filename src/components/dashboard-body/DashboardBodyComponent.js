import React, { useState } from 'react';
import './DashboardBodyComponent.css';

const DashboardBody = (props) => {
  const [count, setCounter] = useState(0); // we can use state in functional component with useState -> count is initialised with 0 value and setCounter be as method in the state

  const showCount = () => setCounter(count + 1)
  if(props.students) {
    console.log(props)
    var studentsbody = props.students
    .map(student => {
      return (
        <tr onClick={(id) => props.openUser(student.id)} key={student.id} className="cursor-pointer">
          <td style={{textTranform: 'capitalize'}}>{student.membershipNumber}</td>
          <td style={{textTranform: 'capitalize'}}>{student.name}</td>
          <td style={{textTranform: 'capitalize'}}>{student.email}</td>
          <td style={{textTranform: 'capitalize'}}>{student.phone}</td>
          <td style={{textTranform: 'capitalize'}}>{student.address}</td>
          <td style={{textTranform: 'capitalize'}}>{student.active ? (<div className="badge badge-success"> Active </div>) : (<div className="badge badge-warning">Pending</div>)}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <table className="align-left mb-0 table table-borderless table-striped table-hover" style={{backgroundColor: 'white'}}>
        <thead>
          <tr>
            <th>Membership Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {studentsbody}
        </tbody>
      </table>
      <button onClick={showCount}>click</button>
      <div>{count} times</div>
    </div>
  )
}

export default DashboardBody;