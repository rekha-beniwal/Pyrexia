import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../BaseUrl"
import { checkoutHandler } from './checkout';
const Cart = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem("user-info");
        const userData = JSON.parse(data);
        if (userData) {
          setUserEmail(userData.email);
          
        }
      }, []);


   

    useEffect(() => {
        // Fetch cart items only if userEmail is available
        if (userEmail) {
            const fetchCartItems = async () => {
                  setLoading(true);
                try {
                    const response = await axios.post(`${BASE_URL}/cart?email=${userEmail}`);
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
                finally {
      setLoading(false); // Stop loading after process is done (whether success or failure)
    }
            };

            fetchCartItems();
        }
    }, [userEmail]);

    const handleRemove = async (eventName) => {
        try {
            const response = await axios.post(`${BASE_URL}/cart/remove`, { eventName, userEmail });
            
            if (response.data.success) {
                window.location.reload();
              }
        } catch (err) {
            alert(err.response?.data?.error || 'An error occurred');
          }}
    
    return (
        <div className="cart pt-40 px-4 text-white bg-gradient-to-b from-[#001f3f] to-black min-h-screen">
            <h2 className="text-4xl font-semibold mb-6  animate-pulse">Your Cart</h2>
            {cartItems.length > 0 ? (
                <ul className="list-disc pl-5">
                    {cartItems.map(item => (
                        <li key={item._id} className="mb-4">
                            <div className="border mx-2 max-w-5xl p-2 py-4 rounded shadow-md bg-gray-500 bg-opacity-10">
                                <p className="font-semibold text-2xl">{item.eventName}</p>
                                <p>Team Leader: {item.teamLeaderName}</p>
                                <p>Team Leader Gender: {item.teamLeaderGender}</p>
                                <p>Team Leader Mobile No.: {item.teamLeaderMobileNo}</p>
                                <p>Team Size: {item.teamSize}</p>
                                <p>Fees: ₹{item.fees}</p>
                                <button
                                    onClick={() => checkoutHandler((1+1*0.02), userEmail, item.eventName,`${BASE_URL}/api/eventpaymentverification`,navigate)}
                                    className="mt-2 bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 "
                                 disabled={loading} // Disable button when loading
          >
            {loading ? "Processing..." : "Pay Now"}
                                </button>
                                <button
                                    onClick={() => handleRemove(item.eventName)}
                                    className="mt-2 bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 flex justify-center items-end rounded "
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in your cart</p>
            )}
        </div>
    );
};

export default Cart;
