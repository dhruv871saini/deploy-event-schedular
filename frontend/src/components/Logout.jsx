import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate=useNavigate()
    const handlelogout=()=>{
        
        localStorage.clear()
     navigate("/")   
    }
  return (
    <div>
          <div className='float-right p-2 btn btn-danger text-dark rounded mt-1 mb-1 fs-4' onClick={handlelogout}>Logout</div>

    </div>
  )
}

export default Logout
