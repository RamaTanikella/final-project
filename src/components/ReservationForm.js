import "react-datepicker/dist/react-datepicker.css"
import React, {useState} from 'react';
import ReactDatePicker from 'react-datepicker';

export const ReservationForm = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    return (
        

    <form onSubmit={(event) => {
        // onSubmit(event)
        event.preventDefault()
        onSubmit({
            name: event.target.name.value,
            phone: event.target.phone.value,
            email: event.target.email.value,
            inDate: startDate,
            outDate: endDate,
        })
        }}>
        <p style={{textAlign: "center", fontWeight: "bold"}}>
        Make a Reservation
        </p>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" placeholder="John Doe" />
        </div> 
        
        <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" className="form-control" id="email"
            placeholder="name@example.com" 
            />
        </div>
        <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control" id="phone"
            placeholder="+1234567890" 
            />
        </div>
        <div className="form-group">
            <label htmlFor="inDate">
                Start Date
            </label>
            <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="outDate">
                Out Date
            </label>
            <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="form-control"/>
        </div>
        <div className="form-group">
            <button className="form-control btn btn-primary" type="submit" >
            Submit
            </button>
        </div>
    </form>
    );
};
export default ReservationForm;