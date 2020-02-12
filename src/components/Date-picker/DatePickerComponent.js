import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = (props) => (
  <DatePicker selected={props.getDate} onChange={date => props.setDate(date)} />
)

export default Datepicker;