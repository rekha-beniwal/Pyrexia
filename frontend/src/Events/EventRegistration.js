import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../BaseUrl";

const RegistrationForm = () => {
  const location = useLocation();
  const subEvent = location.state?.subEvent;
  const [activeEvent, setActiveEvent] = useState(""); 
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState(0); // Initialize to minteamSize
  const [fees, setFees] = useState("");
  const [teamLeaderGender, setTeamLeaderGender] = useState('');
  const [teamLeader, setTeamLeader] = useState({
    name: '',
    mobile: '',
    email: '',
    college: ''
  });
  const [userInfo, setUserInfo] = useState({});
  const eventdetails = {
    "Alfresco": [
        { title: "Capture and Conquer" },
        { title: "Pictionary" },
        { title: "Squid Game" },
        { title: "Paper Dance" },
        { title: "Silent Giggles" },
        { title: "Treasure Hunt" },
        { title: "Darty Secrets" },
        { title: "Songstravaganza" },
        { title: "SwiftMingle" },
        { title: "Tambola" },
        { title: "Evening Amore" },
        { title: "Musical Chairs" },
        { title: "Soul Sync" },
        { title: "Drape It" },
        { title: "Your Pace or Mine?" },
    ],
    "Chorea": [
        { title: "Nritya Sangam" },
        { title: "Ballismus" },
        { title: "Street Blaze" },
        { title: "Adaptune" },
        { title: "Blossoming Steps – Couple Dance" },
    ],
    "Kalakriti": [
        { title: "Fantasy Faces" },
        { title: "Caffeine Creations" },
        { title: "Brushless Strokes" },
        { title: "Acrylic Odyssey" },
        { title: "Tattoo Tales" },
        { title: "Contrast Chronicles" },
        { title: "Cupful of Doodles" },
        { title: "Splash Tees" },
        { title: "Mehendi Mania" },
        { title: "Brush Of Pebbles" },
    ],
    "LITtMania": [
        { title: "Cineholics" },
        { title: "Cognizzia" },
        { title: "Biocrux Jr.(MedQuiz)" },
        { title: "Biocrux Sr.(MedQuiz)" },
        { title: "Anime No Tatakai" },
        { title: "Iconic Impressions " },
        { title: "Unstory" },
        { title: "Rip n Stitch" },
        { title: "Cupid's Countdown" },
        { title: "Kavyotsav:" },
        { title: "Prose the Pictures" },
        { title: "The War of Wits(Debate Competition)" },
        { title: "JAM" },
    ],
    "Sinfonia": [
        { title: "TARANG: Indian Singing" },
        { title: "Euphonia: Western Singing" },
        { title: "METALLICA" },
        { title: "BATTLE OF BANDS" },
        { title: "RHYTHM REVOLUTION - RAP BATTLE AND BEATBOXING" },
    ],
    "Thespians": [
        { title: "Nukkad Natak" },
        { title: "Echoes of Expressions: Monoact and Mime competition" },
        { title: "COMIC-COMBAT: STAND-UP COMEDY" },
        { title: "MADD ANGLE" },
    ],
    "Thunderbolt": [
        { title: "Mortal Kombat" },
        { title: "COD MOBILE (MULTIPLAYER)" },
        { title: "TEKKEN" },
        { title: "FIFA" },
        { title: "BGMI (BATTLE ROYALE)" },
        { title: "BGMI (TEAM DEATH MATCH)" },
    ],
    "Velocity": [
        { title: "Boys Basketball 5V5" },
        { title: "Girls Basketball 5V5" },
        { title: "Boys Basketball 3V3" },
        { title: "Girls Basketball 3V3" },
        { title: "Cricket" },
        { title: "Carrom Singles" },
        { title: "Carrom Doubles" },
        { title: "Carrom Mixed Doubles" },
        { title: "Table Tennis Singles" },
        { title: "Table Tennis Doubles" },
        { title: "Table Tennis Mixed Doubles" },
        { title: "Girls Kabaddi" },
        { title: "Boys Kabaddi" },
        { title: "Volleyball Boys" },
        { title: "Volleyball Girls" },
        { title: "Football (Boys Only)" },
        { title: "Futsal (Boys Only)" },
        { title: "Tennis Singles" },
        { title: "Tennis Doubles" },
        { title: "Tennis Mixed Doubles" },
        { title: "Chess" },
        { title: "Chess (Rapid)" },
        { title: "Chess (Blitz)" },
        { title: "Chess (Bullet)" },
        { title: "Badminton Singles" },
        { title: "Badminton Doubles" },
        { title: "Badminton Mixed Doubles" },
    ],
    "Chronos": [
        { title: "Chronos" },
    ],
};

  const assignActiveEvent = (subEventTitle) => {
    for (const [eventCategory, subEventList] of Object.entries(eventdetails)) {
      if (subEventList.some(event => event.title === subEventTitle)) {
        return eventCategory;
      }
    }
    return ""; // Return empty if no matching event is found
  };


  useEffect(() => {
    console.log(activeEvent);
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    if (userData) {
      setUserInfo(userData);
      setTeamLeader(prev => ({
        ...prev,
        email: userData.email
      })); // Set email from user info
    }
    if (subEvent) {
      const assignedEvent = assignActiveEvent(subEvent.title);
      setActiveEvent(assignedEvent);
    }
  }, [subEvent]);

  
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
      }
        else if (Couple){
          if( size === 2) {
          setFees(Couple);
        }
        }
      
      else if (Solo && Duet && groupTeam) {
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
    calculateFees(teamSize, gender);
   // Ensure teamSize is defined before using it
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const registrationData = {
      mainevent:activeEvent,
      eventName: subEvent.title,
      teamLeaderName: teamLeader.name,
      teamLeaderMobileNo: teamLeader.mobile,
      teamLeaderEmail: teamLeader.email,
      teamLeaderCollege: teamLeader.college,
      teamSize,
      teamLeaderGender,
      fees:(fees * 1.02).toFixed(2)
    };
console.log(registrationData);
    try {
      const response = await axios.post(`${BASE_URL}/registerevent`, registrationData);
      alert(response.data.message);
      if (response.data.success) {
        navigate('/cart');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }finally {
      setLoading(false); // End loading
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
  <label className="block text-sm font-medium mb-2">Team Leader Mobile No.</label>
  <input
    type="text"  // Change type to "text" to prevent scientific notation for long numbers
    name="mobile"
    value={teamLeader.mobile}
    onChange={handleTeamLeaderChange}
    className="w-full border border-gray-300 p-2 rounded"
    maxLength="10"  // Restrict the length to 10 digits
    pattern="\d{10}"  // Regex pattern to ensure 10 digits
    title="Please enter a valid 10-digit mobile number"
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
          <div className="text-lg font-bold"> {fees ? `₹${(fees * 1.02).toFixed(2)}` : ""}</div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#001f3f] hover:bg-gradient-to-t from-blue-800 via-blue-500 to-blue-400 text-white p-2 rounded "
              disabled={loading}
          >
               {loading ? "Processing..." : "Add to Cart"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm
