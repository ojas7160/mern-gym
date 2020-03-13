import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import './DashboardBodyComponent.css';

const DashboardBody = (props) => {
  // =========== React Hooks =====================

  const [count, setCounter] = useState(0); // we can use state in functional component with useState -> count is initialised with 0 value and setCounter be as method in the state
  const [page, setPage] = useState(1);
  useEffect(() => { // it runs after every change like componentDidMount and componentWillUpdate or componentWillUnmount
    // document.title = `you clicked ${count} times`
    return function cleanup() {
      // document.title = 'you clicked 0 times'; // componentWillUnmount will run only when there return function in useEffect
    }
  }, [count]) // only re-runs when count changes, this is optimization, or use [] instead -> it only runs one time

  
  // const handleScroll = () => {
  //   console.log('here')
  //   document.onscroll = debounce(() => {
  //     console.log('hello')
  //     const {
  //       state: {
  //         error,
  //         isLoading,
  //         hasMore,
  //       }
  //     } = this;
  
  //     // Bails early if:
  //     // * there's an error
  //     // * it's already loading
  //     // * there's nothing left to load
  //     // if (error || isLoading || !hasMore) return;
  
  //     // Checks that the page has scrolled to the bottom
      
  //     // console.log(this.state.page)
  //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //       setPage(page + 1)
  //       if(props.totalPages >= page) {
  //         props.getUsers(page);
  //       }
  //     }
     
      
  //   }, 100);
  // }

  useEffect(() => {
    console.log('div', document.getElementById('tableDiv'))
    // document.getElementById('tableDiv').addEventListener('scroll', handleScroll);
  })

  const showCount = () => setCounter(count + 1)
  // =========== React Hooks end =====================

  // =========== custom Hooks =================
  // you can make your custom hook using react hooks
  function useStatus (activeStatus) {
    const [status, setStatus] = useState(null);
    // setStatus(activeStatus)
    return status === 'loading' ? 'Loading' : 'Pending';
  }

  const onlineStatus = useStatus('active'); // custom hook
  // =========== custom Hooks end =================

  const inputEl = useRef(null); // it gives us the refernce to that element , just like refernce variable in angular
  const onButtonClick = () => {
    console.log(inputEl)
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
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
    <div style={{height: '50vh', overflow: 'auto'}}>
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
      {/* <button onClick={showCount}>click</button>
      <div>{count} times</div>
      <div>{onlineStatus}</div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button> */}
    </div>
  )
}

export default DashboardBody;