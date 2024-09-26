import React from 'react';
import img from "../Images/schedule.jpg";
import img1 from "../Images/schedule1.jpg";
import img2 from "../Images/schedule2.jpg";
import img3 from "../Images/schedule3.jpg";
import img4 from "../Images/schedule4.jpg";
import img5 from "../Images/schedule5.jpg";


const Schedule = () => {
  // Sample data for schedule images
  const scheduleData = [
    { id: 1, image:img1 , date: 'Day 1: 10 Oct' },
    { id: 2, image:img2 , date: 'Day 2: 11 Oct' },
    { id: 3, image:img3 , date: 'Day 3: 12 Oct' },
    { id: 4, image:img4 , date: 'Day 4: 13 Oct' },
    { id: 5, image:img5 , date: 'Day 5: 14 Oct' },
  ];

  return (
    <div className="w-full h-full mx-auto p-6 font-sant-serif poppins mt-10 bg-gradient-to-b from-[#001f3f] to-black">
      {/* Main Image Section */}
      <div className="relative w-full h-auto flex  justify-center items-center mt-8  rounded-lg overflow-hidden mb-10 ">
        <img
          src={img}
          alt="Main Schedule"
          className="w-full h-full md:w-[40%] md:h-[40%] rounded-lg object-cover"
        />
        <div className="absolute inset-0  flex flex-col justify-center items-center text-white text-center">
        </div>
      </div>

      {/* Schedule Details Section */}
      <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {scheduleData.map((schedule) => (
          <div
            key={schedule.id}
            className="relative bg-gray-100 rounded-lg shadow-lg my-4 overflow-hidden"
          >
            <img
              src={schedule.image}
              alt={`Schedule for ${schedule.date}`}
              className="w-full h-auto "
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{schedule.date}</h2>
              <p className="text-gray-600">{schedule.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Schedule;
