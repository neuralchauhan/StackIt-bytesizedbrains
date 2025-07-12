import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <p className='text-4xl'>StackIt</p>
      </div>
      <div>
        <p className='text-xl'>Login</p>
      </div>
    </div>
  )
}

export default Navbar
