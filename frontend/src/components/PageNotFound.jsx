import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate=useNavigate()
  return (
    <div className='display-1 text-center  fw-bold p-5 h-100'>
    Page Not Found
       <div className='fs-2'>
        Sorry for Inconvenience 
       </div>
        <div className="btn btn-primary p" onClick={()=>navigate("/")}>HOME</div>
    </div>
  )
}

export default PageNotFound
