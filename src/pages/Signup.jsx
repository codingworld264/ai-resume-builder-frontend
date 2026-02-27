import React from 'react'

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 col-md-4">
        <h3 className="text-center mb-4">Create Account</h3>
        
        <input type="text" className="form-control mb-3" placeholder="Full Name" />
        <input type="email" className="form-control mb-3" placeholder="Email" />
        <input type="password" className="form-control mb-3" placeholder="Password" />
        
        <button className="btn btn-primary w-100">Sign Up</button>
        
        <p className="text-center mt-3">
        Already have account? <a href="/login">Login</a>
        </p>
    </div>
    </div>
  )
}

export default Signup
