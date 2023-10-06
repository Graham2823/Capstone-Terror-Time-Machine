import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../server/src/config/fireBase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateUser.css';
import { Link } from 'react-router-dom';
import Avatar1 from '../../assets/Avatar1.png';
import Avatar2 from '../../assets/Avatar2.png';
import Avatar3 from '../../assets/Avatar3.png';
import Avatar4 from '../../assets/Avatar4.png';
import Avatar5 from '../../assets/Avatar5.png';
import Avatar6 from '../../assets/Avatar6.png';
import Avatar7 from '../../assets/Avatar7.png';
import Avatar8 from '../../assets/Avatar8.png';

const avatarOptions = [
	Avatar1,
	Avatar2,
	Avatar3,
	Avatar4,
	Avatar5,
	Avatar6,
	Avatar7,
	Avatar8,
  ];

function CreateUser() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
	const navigate = useNavigate();

	const handleSignup = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			console.log(user.uid);
			const requestData = {
				username: username,
				uid: user.uid,
				profileImage: selectedAvatar
			};
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}`,
				requestData
			);
			console.log('Successfully signed up:', user);
			console.log('Backend response:', response.data);
			toast.success("User Successfully Created, Sign in to Continue!")
			setTimeout(() => {
				navigate('/signin');
			}, 2000);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				toast.error("Email already in use");
			} else if (error.code === "auth/weak-password"){
				toast.error("Password should be at least 6 characters");
			}
			else {
				console.error('Error signing up:', error.code);
			}
		}
	};

	return (
		<div>
		  <ToastContainer />
		  <h2>Sign Up</h2>
		  <div className="sign-up">
			<input
			  type="username"
			  placeholder="Username"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			/>
			<input
			  type="email"
			  placeholder="Email"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			/>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
			<h2>Select an Avatar</h2>
			<div className="avatar-options">
			  {avatarOptions.map((avatar, index) => (
				<label key={index}>
				  <img
					src={avatar}
					alt={`Avatar ${index + 1}`}
					className={selectedAvatar === avatar ? "selected" : ""}
					onClick={() => setSelectedAvatar(avatar)}
				  />
				</label>
			  ))}
			</div>
		  </div>
		  <button onClick={handleSignup}>Sign Up</button>
		  <p>
			<Link to={"/signin"}>
			  Already have an account? Click here to sign in
			</Link>
		  </p>
		</div>
	  );			  
}

export default CreateUser;
