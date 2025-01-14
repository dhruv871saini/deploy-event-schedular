import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Login = () => {
const navigate= useNavigate()
  const [user, setuser] = useState({
    userEmail:"",
    userPassword:""
  })
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setuser({...user,[name]:value})
  }
const handleSubmit= async(e)=>{
  e.preventDefault();
  try {
    await axios.post(`http://localhost:2004/api/v1/login`,user)
    .then((response)=>{
      console.log(response)
    const token = response.data.token;
    if(response.request.status===200){
      localStorage.setItem('token',token)      
      toast.success('Successfully logged in');
      navigate('/home');
    }
  })
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="container-fluid frontback d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-4 p-4 rounded zindex form-container">
          <div className="display-5 text-center fw-bold text-white mt-4">Login</div>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label className="fs-4 text-light">UserEmail:</label>
              <input
                type="text"
                className="form-control border-light"
                placeholder="Enter UserEmail"
                name='userEmail'
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
                name='userPassword'
                value={user.userPassword}
                onChange={handleInputChange}

              />
            </div>
            <div className="form-group mt-3 text-center">
              <p>
                <Link to="/signup" className="text-light">Don't have an account? Sign Up</Link>
              </p>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary w-50">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
