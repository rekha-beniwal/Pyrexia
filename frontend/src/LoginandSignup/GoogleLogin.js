import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import {useNavigate} from 'react-router-dom';
    
const GoogleLogin = (props) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				const result = await googleAuth(authResult.code);
				const {email, name, image} = result.data.user;
				const token = result.data.token;
				const obj = {email,name, token, image};
				localStorage.setItem('user-info',JSON.stringify(obj));
				navigate('/profile');
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#001f3f] via-purple-800 to-[#001f3f] text-white">
  <h1 className="text-6xl font-bold mb-8 animate-pulse tracking-wider">Feel the Heat</h1>
  <h2 className="text-4xl font-semibold mb-12">Welcome to <span className="text-pink-600">Pyrexia</span></h2>
  
  <button
    onClick={googleLogin}
    className="bg-pink-600  hover:bg-pink-400 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-110 hover:rotate-2 shadow-lg"
  >
    Sign in with Google
  </button>

  <p className="mt-10 text-lg italic animate-bounce">Join the fire. Ignite your passion at Pyrexia!</p>
</div>

	);
};

export default GoogleLogin;