import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    names: '',
    location: '',
    description: '',
    category: '',
    date: '',
    time: ''
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // To track which event is being edited

  // Fetch events from the backend when the component loads
  useEffect(() => {
    const datas=localStorage.getItem("token")

    axios.get('http://localhost:2004/api/v1/events',{
      headers:{
        Authorization:`Bearer ${datas}`
      }
    })
      .then(response => {
        console.log("get api ka clg", response)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    if (editIndex !== null) {
      const datas=localStorage.getItem("token")

      axios.patch(`http://localhost:2004/api/v1/events/${data[editIndex]._id}`, formData,{
        headers:{
          Authorization:`Bearer ${datas}`
        }
      })
        .then(response => {
          const updatedData = [...data];
          updatedData[editIndex] = response.data;

          setData(updatedData);
          setEditIndex(null); // Reset edit index
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    }

    // Reset form after submit
    setFormData({
      names: '',
      location: '',
      description: '',
      category: '',
      date: (new Date()).toDateString(),
      time: ''
    });
  };

  const handleUpdateClick = (index) => {
    setFormData(data[index]); // Set form data for editing
    setEditIndex(index); // Set the index of the event to edit
  };

  const handleDelete = (index) => {
    const datas=localStorage.getItem("token")

    const eventId = data[index]._id;
    axios.delete(`http://localhost:2004/api/v1/events/${eventId}`,{
      headers:{
        Authorization:`Bearer ${datas}`
      }
    })
      .then(() => {
        const updatedData = data.filter((_, i) => i !== index); // Remove the event filter format is event and index so index is given 
        setData(updatedData); // Update the state
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  return (
    <div className="container-fluid px-5 padd  ">

      <div className="row px-5">
        {/* Form to update or add events */}
        <div className="col-md-4 px-4 ">
          <form onSubmit={handleSubmit} className=" border rounded shadow form-container ">
            <h2 className="text-center text-light fw-bold mb-4">Update Event</h2>
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
              <label className="fs-5 text-light">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
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
                {editIndex !== null ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </form>
        </div>

    
        <div className="col-md-8 form-container text-light pt-5">
          <div className='hiddenoverflow'>
            <table className="table table-bordered text-white text-center">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                {
                  data.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="text-center display-1 fw-bold">
                          No Event Scheduled by you
                        </div>
                        
                      </td>
                    </tr>
                  ) : (
                    data.map((event, index) => (
                      <tr key={index}>
                        <td>{event.names}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>{event.category}</td>
                        <td>{event.description}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => handleUpdateClick(index)}
                              className="btn btn-warning btn-sm me-2"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
          <div className='btn btn-primary m-3 mt-5 fs-5 ' onClick={()=>navigate("/home")}>   Create New Events
          
         </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
