import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkoutHandler } from "./checkout";
import { BASE_URL } from "../BaseUrl";

const BasicRegistrationPayment = ({ subEvent }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    mobile: "",
    tickets: 1,
  });
  const [fees, setFees] = useState(0);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user info from localStorage
  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  // Update fees=200 when tickets are updated
  useEffect(() => {
    setFees((1+1*0.02) * formData.tickets);
  }, [formData.tickets]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Proceed to payment after user confirmation

      await checkoutHandler(fees, userInfo, formData, `${BASE_URL}/api/basicpaymentverification`, navigate);

    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setLoading(false); // Stop loading after process is done (whether success or failure)
    }
  }; 
  
  return (
    <div className="mt-24 bg-white p-8 rounded shadow-md my-24 max-w-5xl  mx-auto ">
      <h2 className="font-bold animate-pulse text-2xl md:text-3xl mx-auto my-5">Basic Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Team Leader Info */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mobile No.</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ticket No.</label>
          <input
            type="number"
            name="tickets"
            value={formData.tickets}
            min="1"
            max="15"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Total:</label>
          <div className="text-lg font-bold">₹{fees}</div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 rounded "
         disabled={loading} // Disable button when loading
          >
            {loading ? "Processing..." : "Confirm Registration"}
         
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicRegistrationPayment;
