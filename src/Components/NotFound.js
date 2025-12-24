import React from 'react'
import {  useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div class="position-absoulte">
        <div class="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className='fw-bolder' style={{fontSize:'5rem'}}>Oops!</h1>
          <h5 className='fw-bold' style={{fontSize:'1rem'}}>404 - PAGE NOT FOUND</h5>
          <p>Sorry, we couldn't find this page.</p>
          <button type="button" class="btn btn-info" onClick={()=>{navigate('/')}}>Back to homepage</button>
        </div>
      </div>
  )
}
