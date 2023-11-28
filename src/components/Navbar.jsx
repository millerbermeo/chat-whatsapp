import React from 'react'

function Navbar() {
  return (

    <>
      <nav className='w-full hidden lg:flex top-0 h-16 bg-gray-200 z-[-1] rounded-lg justify-between items-center pr-3'>
        {/* Logo */}
        <div className='ml-3 text-xl font-bold text-gray-800'>
          YourLogo
        </div>

        {/* Menu Items */}
        <div className='flex items-center space-x-4'>
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
        <div className='w-[35px] h-[35px] bg-slate-800 rounded-full text-white text-xl flex justify-center items-center'>
          <i className="fa-solid fa-user"></i>
        </div>

      </nav>
    </>

  )
}

export default Navbar
