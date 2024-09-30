import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../BaseUrl";

const RegistrationForm = () => {
  const location = useLocation();
  const subEvent = location.state?.subEvent;
   const activeEvent = location.state?.activeEvent;
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState(subEvent?.minteamSize || 0); // Initialize to minteamSize
  const [fees, setFees] = useState("");
  const [teamLeaderGender, setTeamLeaderGender] = useState('');
  const [teamLeader, setTeamLeader] = useState({
    name: '',
    mobile: '',
    email: '',
    college: ''
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    if (userData) {
      setUserInfo(userData);
      setTeamLeader(prev => ({
        ...prev,
        email: userData.email
      })); // Set email from user info
    }
  }, []);

  if (!subEvent) {
    return <p>Error: Registration not available.</p>;
  }

  const calculateFees = (size, gender) => {
    if (subEvent?.fees) {
      const {
        perTeam, perPerson, singleBoy, singleGirl, Couple,
        Solo, Duet, perhead, groupTeam, lonewolves, twolonewolves, threelonewolves
      } = subEvent.fees;

      if (perTeam && perPerson) {
        setFees(size === 1 ? perPerson : perTeam);
      } else if (perTeam) {
        setFees(perTeam);
      } else if (perPerson) {
        setFees(size * perPerson);
      } else if (singleBoy && singleGirl && Couple) {
        if (size === 1 && gender === "Male") {
          setFees(singleBoy);
        } else if (size === 1 && gender === "Female") {
          setFees(singleGirl);
        } else if (size === 2) {
          setFees(Couple);
        }
      }else if (singleBoy && singleGirl) {
        if (size === 1 && gender === "Male") {
          setFees(singleBoy);
        } else if (size === 1 && gender === "Female") {
          setFees(singleGirl);
        }
      }else if (Couple && teamSize === 2) {
          setFees(Couple);
      }else if (Solo && Duet && groupTeam) {
        if (size === 1) {
          setFees(Solo);
        } else if (size === 2) {
          setFees(Duet);
        } else {
          setFees(groupTeam);
        }
      } else if (Solo && Duet && perhead) {
        if (size === 1) {
          setFees(Solo);
        } else if (size === 2) {
          setFees(Duet);
        } else {
          setFees(size * perhead);
        }
      } else if (Solo && Duet) {
        if (size === 1) {
          setFees(Solo);
        } else if (size === 2) {
          setFees(Duet);
        }
      } else if (lonewolves && twolonewolves && threelonewolves) {
        if (size === 1) {
          setFees(lonewolves);
        } else if (size === 2) {
          setFees(twolonewolves);
        } else if (size === 3) {
          setFees(threelonewolves);
        }
      } else {
        setFees("Fees information not available");
      }
    } else {
      setFees("Fees information not available");
    }
  };

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value, 10); // Ensure size is treated as a number
    setTeamSize(size);
    calculateFees(size, teamLeaderGender);
  };

  const handleTeamLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader(prevLeader => ({ ...prevLeader, [name]: value }));
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setTeamLeaderGender(gender);
    calculateFees(teamSize, gender); // Ensure teamSize is defined before using it
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      mainevent:activeEvent.title,
      eventName: subEvent.title,
      teamLeaderName: teamLeader.name,
      teamLeaderMobileNo: teamLeader.mobile,
      teamLeaderEmail: teamLeader.email,
      teamLeaderCollege: teamLeader.college,
      teamSize,
      teamLeaderGender,
      fees
    };

    try {
      const response = await axios.post(`${BASE_URL}/registerevent`, registrationData);
      alert(response.data.message);
      if (response.data.success) {
        navigate('/cart');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleClick = () => {
    navigate('/subevent-details', { state: { subEvent } });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md my-24 max-w-5xl mx-auto overflow-x-auto">
      <div className="mt-2 mb-3">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#001f3f" onClick={handleClick}
          style={{ cursor: 'pointer' }}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Event Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Info */}
        <div>
          <label className="block text-sm font-medium mb-2">Event</label>
          <p>{subEvent.title}</p>
        </div>

        {/* Team Leader Info */}
        <div>
          <label className="block text-sm font-medium mb-2">Team Leader Name</label>
          <input
            type="text"
            name="name"
            value={teamLeader.name}
            onChange={handleTeamLeaderChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Leader Mobile</label>
          <input
            type="text"
            name="mobile"
            value={teamLeader.mobile}
            onChange={handleTeamLeaderChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Leader Email</label>
          <input
            type="email"
            name="email"
            value={teamLeader.email}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">College</label>
          <input
            type="text"
            name="college"
            value={teamLeader.college}
            onChange={handleTeamLeaderChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
  <label className="block text-sm font-medium mb-2">Team Size</label>
  <input
    type="number"
    value={teamSize}
    min={subEvent.minteamSize}
    max={subEvent.maxteamSize}
    onChange={handleTeamSizeChange}
    className="w-full border border-gray-300 p-2 rounded"
    required
  />
  {/* {!(teamSize == subEvent.teamvalue || (teamSize >= subEvent.minteamvalue && teamSize <= subEvent.maxteamSize)) && (
    <p className="text-red-500 text-sm mt-1">
      Team size is not correct. Please read the event description carefully.
    </p>
  )} */}
</div>


        <div>
          <label className="block text-sm font-medium mb-2">Team Leader Gender</label>
          <select
            value={teamLeaderGender}
            onChange={handleGenderChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Registration Fees:</label>
          <div className="text-lg font-bold">{fees ? `₹${fees}` : ""}</div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 rounded "
          >
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm
