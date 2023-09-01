import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav>
        <Link className='link' to="/">Signup</Link>
        <Link className='link' to="/login">Login</Link>
        <Link className='link' to="/addinventory">Add Inventory</Link>
        <Link className='link' to="/viewinventory">View Inventory</Link>
      </nav>
    </div>
  )
}

export default Header