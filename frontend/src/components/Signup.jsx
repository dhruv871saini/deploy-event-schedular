// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post('http://localhost:2004/api/v1/signup', user);
      console.log("dhjh",res);
      if (res.status===201) {
        toast.success('Successfully Signed Up');
        navigate('/');
        
      }else{

        toast.error(res.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div>
      <div className="container-fluid frontback d-flex align-items-center justify-content-center vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-4 p-4 rounded zindex form-container">
            <div className="display-5 text-center fw-bold text-white mt-4">Sign Up</div>
            <form onSubmit={handleSubmitForm}>
              <div className="form-group mt-4">
                <label className="fs-4 text-light">UserName:</label>
                <input
                  type="text"
                  className="form-control border-light"
                  placeholder="Enter Username"
                  name="userName"
                  value={user.userName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mt-4">
                <label className="fs-4 text-light">UserEmail:</label>
                <input
                  type="text"
                  className="form-control border-light"
                  placeholder="Enter UserEmail"
                  name="userEmail"
                  value={user.userEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mt-3">
                <label className="fs-4 text-light">Password:</label>
                <input
                  type="password"
                  className="form-control border-light"
                  placeholder="Enter Password"
                  name="userPassword"
                  value={user.userPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary w-50">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
