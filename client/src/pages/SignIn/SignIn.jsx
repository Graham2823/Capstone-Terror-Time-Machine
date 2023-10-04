import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../server/src/config/fireBase.config';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleSignin, setUsername } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSignInClick = async () => {
		try {
			// Call the handleSignin function from context
			await handleSignin(email, password);
	
			// After successful sign-in, fetch and set the user's name
			const user = JSON.parse(localStorage.getItem('user'));
			const userID = user.uid;
			axios
				.get(`http://localhost:3001/api/user/${userID}`)
				.then((response) => {
					const username = response.data.username;
	
					// Set the username in the context
					setUsername(username);
	
					// Store the username in local storage
					localStorage.setItem('username', JSON.stringify(username));
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
			<button onClick={handleSignInClick}>Sign In</button>
			<p>
				<Link to={'/signup'}>Dont have an account? Click here to sign up</Link>
			</p>
		</div>
	);
}
export default SignIn;
