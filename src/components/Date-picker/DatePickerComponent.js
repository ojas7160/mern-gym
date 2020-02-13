import React from 'react';
import DatePicker from "react-datepicker";
import './DatePickerComponent.css'
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = (props) => (
<DatePicker className={props.class} selected={props.getDate} onChange={date => props.setDate(date)} />
)

export default Datepicker;