import React from 'react';
import { useNavigate } from 'react-router-dom';
const MembershipCard = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-[#001f3f] min-h-screen flex flex-col items-center'>
      {/* Header Section */}
      <div className="relative pt-28 pb-16">
        <h1 className="text-[#ebe6d0] text-center text-[3.5rem] font-bold leading-[4.5rem] z-10 md:text-[3.7rem] md:px-12 md:leading-[3.5rem]">
          Pyrexia Membership Card
        </h1>
       
      </div>

      {/* Content Section */}
      <div className="pb-20 flex relative items-center justify-center text-white">
        <div className="backdrop-blur-sm rounded-xl m-auto p-8 lg:px-10 shadow-lg border border-gray-700">
          <div className="text-lg font-light text-justify max-w-4xl pt-8 pb-10">
            <h2 className="text-2xl font-semibold mb-4">Membership Benefits:</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>1. Security Fees</li>
              <li>2. Green Charges</li>
              <li>3. Free Access to Pronites</li>
              <li>4. Unique Experiences</li>
              <li>5. Unforgettable Moments</li>
              <li>6. Lifetime Memories</li>
            </ul>

            <div className="font-bold text-lg italic sant-serif poppins">
              
              <span className="text-[#ebe6d0]"> Rs. 1800 + 2% Conventional Fees</span>
            </div>

           

            <p className="mt-4 text-center italic text-md text-gray-400">
              Note: This does not include entry to individual events.
            </p>
          </div>

          {/* Register Button */}
          <div className="flex justify-center items-center mt-8 p-4">
  {/*  <button
              className="bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white-black px-8 py-3 rounded-lg font-bold text-lg border-2 border-[#d9d2b8] shadow-md hover:shadow-lg transition duration-300"
              onClick={() => {navigate("/membership-card-form")}}
            >
              Register Now
            </button>*/}
            Registration Closed
          </div>
          </div>
          </div>

          {/* Decorative Dots */}
          <div className="flex items-center justify-center gap-3 pt-10 pb-10">
            <div className="h-3 w-3 bg-[#ebe6d0] rotate-45"></div>
            <div className="h-3 w-3 bg-[#ebe6d0] rotate-45"></div>
            <div className="h-3 w-3 bg-[#ebe6d0] rotate-45"></div>
          </div>
       
     
    </div>
  );
};

export default MembershipCard;
