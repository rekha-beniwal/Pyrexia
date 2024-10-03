
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../BaseUrl";

const MembershipCardPayment = () => {
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

  // Update fees when tickets are updated
  useEffect(() => {
    setFees((1800*1.02)* formData.tickets);
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
    
    const registrationData = {
      name: userInfo.name,
      email: userInfo.email,
      mobile: formData.mobile,
      fees: fees,
    };
  
    try {
      // Proceed to send registration data to the backend
      const response = await axios.post(`${BASE_URL}/api/saveMemberCard`, registrationData);
      
      // Show the message from the response
      alert(response.data.message);
  
      // Navigate if the success flag is true
      if (response.data.success) {
        navigate('/cart');
      }
    
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
      
  

  return (
    <div className="mt-24 bg-white p-8 rounded shadow-md my-24 max-w-5xl  mx-auto ">
      <h2 className="font-bold animate-pulse text-2xl md:text-3xl mx-auto my-5">Purchase MembershipCard</h2>
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
    type="text"  // Change type to "text" to prevent scientific notation for long numbers
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
    className="w-full border border-gray-300 p-2 rounded"
    maxLength="10"  // Restrict the length to 10 digits
    pattern="\d{10}"  // Regex pattern to ensure 10 digits
    title="Please enter a valid 10-digit mobile number"
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
            {loading ? "Processing..." : "Add to cart"}
          
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembershipCardPayment;
