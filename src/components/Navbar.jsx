import React from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/images/farmsharm-logo.jpeg'

function Navbar() {
  return (
    <nav className='bg-green-700 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>

        <div className='fex items-center gap-3'>
          <img 
            src={logo} 
            alt="FarmSharm"
            className='h-10 w-10' 
          />
          <h1 className='font-bold text-xl'>FarmSharm</h1>
        </div>

        <div className='flex gap-6'>
          <Link to="/">Home</Link>
          <Link to="/farmers">Farmers</Link>
          <Link to="/labourers">Labourers</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
