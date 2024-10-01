import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Assuming you'll fetch additional data from backend
import { BASE_URL } from '../BaseUrl';  // Update with your base URL

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [memberCard, setMemberCard] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);

        if (userData) {
            // Fetch registration, events, and member card data if not already in localStorage
            fetchUserDetail1(userData.email); 
            fetchUserDetail2(userData.email); 
            fetchUserDetail3(userData.email);  // Assuming user ID is available
        }
    }, []);

    const fetchUserDetail1 = async (email) => {
        try {
            const memberCardResponse = await axios.post(`${BASE_URL}/user/member-card`, { email });
            setMemberCard(memberCardResponse.data);         

        } catch (error) {
            console.error("Error fetching membercard details details:", error);
        }
    };
    const fetchUserDetail2 = async (email) => {
        try {
            const registrationResponse = await axios.post(`${BASE_URL}/user/registrations`, { email });
            
            setRegistrations(registrationResponse.data);                     

        } catch (error) {
            console.error("Error fetching basic registration details:", error);
        }
    };
    const fetchUserDetail3 = async (email) => {
        try {
            const eventsResponse = await axios.post(`${BASE_URL}/user/events`, { email });
            setEvents(eventsResponse.data);       
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#001f3f] to-black mt-10 py-10 px-2">
            <div className="bg-gray-800 bg-opacity-60 shadow-lg rounded-lg p-8 max-w-md w-full text-center transform transition duration-500 hover:scale-105">
                {userInfo ? (
                    <>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white ">
                            Welcome, {userInfo?.name}
                        </h1>
                        <h3 className="text-lg md:text-xl mt-4 text-gray-400 overflow-x-auto">{userInfo?.email}</h3>

                        {/* Basic Registration Tickets */}
                        <div className="mt-6 text-left text-white">
                            <h2 className="text-xl font-semibold">Basic Registration Tickets:</h2>
                            {registrations.length > 0 ? (
                                <div className="overflow-x-auto mt-5">
                                    <table className="min-w-full border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border-b"></th>
                                                <th className="px-4 py-2 border-b">Payment ID</th>
                                                <th className="px-4 py-2 border-b">Tickets Purchased</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map((ticket, index) => (
                                                <tr key={index}>
                                                    <td className="border px-4 py-2">{index + 1}</td>
                                                    <td className="border px-4 py-2">{ticket.payment_Id}</td>
                                                    <td className="border px-4 py-2">1</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="mt-2">No basic registration tickets found.</p>
                            )}


                        </div>

                        {/* Events Registered */}
                        <div className="mt-6 text-left text-white">
                            <h2 className="text-xl font-semibold">Events Registered:</h2>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <div key={index} className="mt-4">
                                        <p className="font-semibold text-xl text-blue-200">{event.eventName}</p>
                                        <p>Team Leader: {event.teamLeaderName}</p>
                                        <p>Team Leader Gender: {event.teamLeaderGender}</p>
                                        <p>Team Leader Mobile No.: {event.teamLeaderMobileNo}</p>
                                        <p>Team Size: {event.teamSize}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="mt-2">No events registered.</p>
                            )}
                        </div>


                        {/* Member Card Purchased */}
                        <div className="mt-6 text-left text-white">
                            <h2 className="text-xl font-semibold">MemberShip Card:</h2>
                            {memberCard ? (
                                <div className="mt-2">
                                    Payment ID for your Membership Card : <p className="text-blue-200">{memberCard}</p>
                                </div>
                            ) : (
                                <p className="mt-2">No Membership Card purchased.</p>
                            )}
                        </div>
                        {/* Additional Information */}
                        <div className="mt-8 text-left text-white">
                            <h2 className="text-xl font-semibold">Important Information:</h2>
                            <ul className="list-disc list-inside mt-4">
                                <li>Registrations done through Google forms will not show up on your profile.</li>
                                <li>Confirmation emails for registrations will be sent to you within 1-2 days, and updates on your profile may take some additional time.</li>
                                <li>For individual events, you will be added to respective WhatsApp groups for the events within 1-2 days.</li>
                                <li>For any irregularities in event registration, please fill out the form <a href="https://forms.gle/g6AiSsRyDucaYFCQ6" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">here</a>.</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="mt-6 px-4 py-2 bg-pink-800 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-t from-pink-500 to-pink-400 transition transform hover:scale-110 hover:rotate-2 shadow-lg"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-xl text-gray-700">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
