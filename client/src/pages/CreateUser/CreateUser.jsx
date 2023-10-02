import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../server/src/config/fireBase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateUser() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
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
			};
			const response = await axios.post(
				'http://localhost:3001/api',
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
			<ToastContainer/>
			<h2>Signup</h2>
			<input
				type='username'
				placeholder='username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
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
			<button onClick={handleSignup}>Sign Up</button>
		</div>
	);
}

export default CreateUser;
