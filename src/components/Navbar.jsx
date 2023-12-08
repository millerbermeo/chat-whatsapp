import React from 'react'
import Dropdown from "./Dropdown"

function Navbar() {
  return (

    <>
      <nav className='w-full lg:z-0 relative mt-2 md:mt-0 flex lg:hidden top-0 h-16 bg-gray-200 rounded-lg justify-between items-center pr-3'>
        {/* Logo */}
        <div className='ml-3 text-xl font-bold text-gray-800'>
          <img className='w-52 hidden' src="negociemoss.png" alt="" />
        </div>

      

        {/* Menu Items */}
        <div className='hidden md:flex items-center space-x-4'>
          <a href="#" className='text-gray-700 hover:text-gray-900'>
            Home
          </a>
          <a href="#" className='text-gray-700 hover:text-gray-900'>
            About
          </a>
          <a href="#" className='text-gray-700 hover:text-gray-900'>
            Services
          </a>
          <a href="#" className='text-gray-700 hover:text-gray-900'>
            Contact
          </a>
        </div>

        {/* User Icon */}
        <div className='pr-12 lg:pr-0'>
      <Dropdown/>
      </div>

      </nav>
    </>

  )
}

export default Navbar
