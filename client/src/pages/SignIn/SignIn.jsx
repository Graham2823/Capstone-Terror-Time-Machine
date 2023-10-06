import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleSignin, setUsername, setProfileImage, profileImage } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSignInClick = async () => {
		try {
			// Call the handleSignin function from context
			await handleSignin(email, password);
	
			// After successful sign-in, fetch and set the user's name
			const user = JSON.parse(localStorage.getItem('user'));
			const userID = user.uid;
			axios
				.get(`${import.meta.env.VITE_API_URL}/user/${userID}`)
				.then((response) => {
					console.log("response", response)
					const username = response.data.username;
	
					// Set the username in the context
					setUsername(username);
					setProfileImage(response.data.profileImage)
					// Store the username in local storage
					localStorage.setItem('username', JSON.stringify(username));
					localStorage.setItem('profileImage', JSON.stringify(response.data.profileImage));
				})
				.catch((error) => {
					console.error('Error fetching data:', error.message);
				});
	
			console.log('Successfully signed in');
			navigate('/');
		} catch (error) {
			console.error('Error signing in:', error.code);
		}
	};

	return (
		<div>
			<ToastContainer />
			<h2>Sign In</h2>
			<div className='sign-up'>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			</div>
			<button onClick={handleSignInClick}>Sign In</button>
			<p>
				<Link to={'/signup'}>Dont have an account? Click here to sign up</Link>
			</p>
		</div>
	);
}
export default SignIn;
