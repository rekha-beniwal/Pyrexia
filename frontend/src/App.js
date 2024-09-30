import './App.css';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './LoginandSignup/GoogleLogin';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Notfound from './LoginandSignup/notfound';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/home';
import Profile from './components/profile';
import Cart from './Events/Cart';
import ProtectedRoute from './components/protectedroute';

import EventPage from './Events/EventPage';
import SubEventDetails from './Events/SubEventDetails';
import Navbar from './components/navbar';
import StarNight from './components/StarNight';
import Legals from './Legals/Legals';
import Schedule from './components/Schedule';
import BasicRegistration from './components/BasicRegistration';
import Accomodation from './components/Accomodation';
import MembershipCard from './components/MembershipCard';
import BasicRegistrationPayment from './BasicRegistrationPayment/basicregistrationPayment';
import MembershipCardPayment from './MembershipCardPayment/membershipCardPayment';
import RegistrationForm from './Events/EventRegistration';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Google OAuth wrapper component
    const GoogleWrapper = () => (
        <GoogleOAuthProvider clientId="885373696809-o35l4se3j6sjs8gimne5976452vr864e.apps.googleusercontent.com">
            <GoogleLogin />
        </GoogleOAuthProvider>
    );

    // Private Route wrapper to protect authenticated routes
    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    // Check authentication status on load and redirect logic
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const token = JSON.parse(data)?.token;
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/login') {
                navigate('/profile');
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [location, navigate]);

    return (
        <>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<GoogleWrapper />} />
                <Route path="*" element={<Notfound />} />
                <Route path="/events/:eventName" element={<EventPage />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/registerevent" element={<PrivateRoute element={<RegistrationForm />} />} />
                <Route path="/membership-card" element={<MembershipCard />} />
                <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
                <Route path="/starnight" element={<StarNight />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/basic-registration" element={<BasicRegistration />} />
                <Route path="/accomodation" element={<Accomodation />} />
                <Route path="/legalS/:pageName" element={<Legals />} />
                <Route path="/subevent-details" element={<SubEventDetails />} />
                <Route path="/basic-registration-form" element={<PrivateRoute element={<BasicRegistrationPayment />} />} />
                <Route path="/membership-card-form" element={<PrivateRoute element={<MembershipCardPayment />} />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
