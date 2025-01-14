import axios from 'axios';
import React, {  useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';

const Home = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    names: '',
    location: '',
    description: '',
    category: '',
    date: new Date(),
    time: '',
  });
  
  const handleDateChange = (selectedDate) => {
      setFormData({ ...formData, date: selectedDate });
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
    if(!formData.names||!formData.location||!formData.description||!formData.time||!formData.date||!formData.category){
       return toast.error("All field required")
    }
    try {
      const datas=localStorage.getItem("token")
      console.log(datas)
      const res =axios.post(`${process.env.REACT_APP_LOCAL_HOST}/api/v1/events`,formData,{
        headers:{
          Authorization:`Bearer ${datas}`
        }
      })
      .then((response)=>{
        if(response.request.status===200){          
          toast.success('Event added Successfullly');
          
        }
      })
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='container-fluid d-flex flex-wrap justify-content-around p-5'>
        <Logout/>

      <div className='col-md-5'>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow form-container">
          <h2 className="text-center text-light fw-bold mb-4">Create Event</h2>
          <div className="form-group mb-3">
            <label className="fs-5 text-light">Event Name:</label>
            <input
              type="text"
              name="names"
              value={formData.names}
              onChange={handleInputChange}
              className="form-control border-light"
              placeholder="Enter Event Name"
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5 text-light">Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="form-control border-light"
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5 text-light">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select border-light"
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Birthday">Birthday</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label className="fs-5 text-light">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-control border-light"
              placeholder="Enter Location"
            />
          </div>
          <div className="form-group mb-3">
            <label className="fs-5 text-light">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control border-light"
              placeholder="Enter Description"
            />
          </div>
         
          
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary w-50">
              Add Calendar
            </button>
          </div>
        </form>
      </div>

      <div className='col-md-5 mt-3'>
        <div className=" border rounded shadow  bg-white">
        <h2 className="text-center fw-bold bg-light ">Select a Date</h2>
          <div className=''>
          <Calendar
            onChange={handleDateChange}
            value={formData.date}
            className="border rounded shadow"
          />
          </div>
          <h4 className="mt-4 text-center text-primary">
            Selected Date: {formData.date.toDateString()}
          </h4>
        </div>
        <div className='btn btn-primary m-3 mt-5 fs-5 form-container ' onClick={()=>navigate("/update")}>   Updation/Deletion 
          
         </div>
      </div>
    </div>
  );
};

export default Home;
