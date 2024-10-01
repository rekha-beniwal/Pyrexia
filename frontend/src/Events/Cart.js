import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../BaseUrl"
import { checkoutHandler } from './checkout';
import { basiccheckoutHandler } from '../BasicRegistrationPayment/checkout';
import { membercheckoutHandler } from '../MembershipCardPayment/checkout';
const Cart = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cart2Items, setCart2Items] = useState([]);
    const [cart3Items, setCart3Items] = useState([]);
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
                try {
                    const response = await axios.post(`${BASE_URL}/cart?email=${userEmail}`);
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            };

            const fetchBasicRegistrationItems=async()=>{
                try {
                    const response = await axios.post(`${BASE_URL}/cart2?email=${userEmail}`);
                    setCart2Items(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }     
            const fetchMembershipCardItems=async()=>{
                try {
                    const response = await axios.post(`${BASE_URL}/cart3?email=${userEmail}`);
                    setCart3Items(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
            fetchCartItems();
            fetchBasicRegistrationItems();
            fetchMembershipCardItems();
        }
    }, [userEmail]);

    
    return (
        <div>
        <div className={`cart pt-40 px-4 text-white bg-gradient-to-b from-[#001f3f] to-black min-h-screen ${loading ? 'blur-md' : ''}`}>
            <h2 className="text-4xl font-semibold mb-6  animate-pulse">Your Cart</h2>
            <br/>
            <div><p className="text-yellow-400 font-semibold mb-4">
                    ⚠️  Important: Please avoid refreshing the page while making the payment. Wait until you see the "Registration Completed" message. Refreshing could lead to issues with saving your details. Also, ensure that your internet connection is stable. Once the payment is successful, you'll be automatically redirected to your profile page.   </p>
            <div><p className='text-2xl text-blue-300 my-2'>Event Cart</p>
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
                                    onClick={() => checkoutHandler(item.fees, userEmail, item.eventName,`${BASE_URL}/api/eventpaymentVerification`,navigate,setLoading)}
                                    className="mt-2 bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 "
                                >
                                    Pay Now
                                </button>
                               
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in your cart</p>
            )}
            </div>
            <div><p className='text-2xl text-blue-300 my-2'>Basic Registration Cart </p>
            {cart2Items.length > 0 ? (
                <ul className="list-disc pl-5">
                    {cart2Items.map(item => (
                        <li key={item._id} className="mb-4">
                            <div className="border mx-2 max-w-5xl p-2 py-4 rounded shadow-md bg-gray-500 bg-opacity-10">
                                <p>Name: {item.name}</p>
                                <p>Email: {item.email}</p>
                                <p>Mobile No.: {item.mobile}</p>
                                <p>No. of Tickets: {item.tickets}</p>
                                <p>Fees: ₹{item.amount}</p>
                                <button
                                    onClick={() => basiccheckoutHandler(item.amount, userEmail,`${BASE_URL}/api/basicpaymentVerification`,navigate,setLoading)}
                                    className="mt-2 bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 "
                                >
                                    Pay Now
                                </button>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in your cart</p>
            )}
            </div>
            <div><p className='text-2xl text-blue-300 my-2'>Membership Card Cart</p>
            {cart3Items.length > 0 ? (
                <ul className="list-disc pl-5">
                    {cart3Items.map(item => (
                        <li key={item._id} className="mb-4">
                            <div className="border mx-2 max-w-5xl p-2 py-4 rounded shadow-md bg-gray-500 bg-opacity-10">
                                <p>Name: {item.name}</p>
                                <p>Email: {item.email}</p>
                                <p>Mobile No.: {item.mobile}</p>
                                <p>Fees: ₹{item.amount}</p>
                                <button
                                    onClick={() => membercheckoutHandler(item.amount, userEmail,`${BASE_URL}/api/membershipCardPaymentVerification`,navigate,setLoading)}
                                    className="mt-2 bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 "
                                >
                                    Pay Now
                                </button>
                                
                                
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in your cart</p>
            )}
            </div>
            </div>
            </div>
            {loading && (
        <div className="fixed inset-0 flex items-center justify-center text-lg  text-white bg-black bg-opacity-50">
          <div className="loader text-2xl text-white mt-40">Loading...</div>
        </div>
      )}
        </div>
    );
};

export default Cart;
