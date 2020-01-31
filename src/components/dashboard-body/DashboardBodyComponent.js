import React from 'react';

const dashboardBody = (props) => {
  if(props.students) {

    var studentsbody = props.students
    .map(student => {
      return (
        <tr key={student.id}>
          <td style={{textTranform: 'capitalize'}}>{student.membershipNumber}</td>
          <td style={{textTranform: 'capitalize'}}>{student.name}</td>
          <td style={{textTranform: 'capitalize'}}>{student.email}</td>
          <td style={{textTranform: 'capitalize'}}>{student.phone}</td>
          <td style={{textTranform: 'capitalize'}}>{student.address}</td>
          <td style={{textTranform: 'capitalize'}}>{student.active ? <div className="badge badge-success"> Active </div> : <div className="badge badge-warning">Pending</div>}</td>
        </tr>
      );
    });
  }
  return (
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
  )
}

export default dashboardBody;