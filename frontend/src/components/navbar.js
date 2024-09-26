import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import img from "../Images/logo.webp";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate('/events/All Events', { state: 'All Events' });
  };

  const buttonClasses = 'text-gray-100 flex justify-center font-bold text-lg px-4 py-3 border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300';

  const Buttons = (
    <>
      <Link to="/" className={buttonClasses}>Home</Link>
      <button className={buttonClasses} onClick={handleEventClick}>Events</button>
      <Link to="/starnight" className={buttonClasses}>Star Night</Link>
      <a href="https://drive.google.com/file/d/12CP4PlhrVhJ4Hi_NVYIhn5B-wWi2q3kr/view?usp=drive_link" className={buttonClasses}>Brochure</a>
      <Link to="/accomodation" className={buttonClasses}>Accomodation</Link>
      <Link to="/schedule" className={buttonClasses}>Schedule</Link>
      <Link to="/membership-card" className={buttonClasses}>Membership Card</Link>
      <Link to="/profile" className={buttonClasses}>Profile</Link>
      <Link to="/cart" className={buttonClasses}>&#128722;</Link>
    </>
  );

  return (
    <nav className='bg-[#001f3f] text-white fixed top-0 left-0 w-full z-50 position-fixed'>
      <div className=' px-5 sm:px-10 lg:px-12'>
        <div className='flex items-center justify-between h-16 mb-4 '>
          <div className='text-xl font-bold font-sans-serif poppins  '>
            <img className='mt-3  w-32 h-auto autoload' src={img} alt="Logo" />
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            type='button' 
            className='mt-3 fill-gray-100 ' 
            aria-label='Toggle menu'>
            <svg viewBox="0 0 100 80" width="30" height="30" >
              <rect width="100" height="15" rx="10"></rect>
              <rect y="30" width="100" height="15" rx="10"></rect>
              <rect y="60" width="100" height="15" rx="10"></rect>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='flex flex-col min-h-screen gap-y-auto px-4 sm:px-6 pb-2' onClick={() => setIsOpen(false)}>
          {Buttons}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
