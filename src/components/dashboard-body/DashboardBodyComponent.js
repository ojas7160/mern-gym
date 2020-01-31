import React from 'react';

const dashboardBody = (props) => {
  if(props.students) {

    var studentsbody = props.students
    .map(student => {
      return (
        <tr key={student.id}>
          <td style={{textTranform: 'capitalize'}}>{student.id}</td>
          <td style={{textTranform: 'capitalize'}}>{student.name}</td>
          <td style={{textTranform: 'capitalize'}}>{student.membershipNumber}</td>
          <td style={{textTranform: 'capitalize'}}>{student.email}</td>
          <td style={{textTranform: 'capitalize'}}>{student.phone}</td>
          <td style={{textTranform: 'capitalize'}}>{student.address}</td>
        </tr>
      );
    });
  }
  return (
    <table className="align-left mb-0 table table-borderless table-striped table-hover" style={{backgroundColor: 'white'}}>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>m.no</th>
          <th>email</th>
          <th>phone</th>
          <th>address</th>
        </tr>
      </thead>
      <tbody>
        {studentsbody}
      </tbody>
    </table>
  )
}

export default dashboardBody;