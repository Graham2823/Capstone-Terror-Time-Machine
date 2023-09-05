import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../server/src/config/fireBase.config';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser, user } = useContext(UserContext);
	const navigate = useNavigate();
	const handleSignin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			setUser(user.uid);
			console.log('Successfully signed in:', user);
			navigate('/');
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};
	console.log(user);
	return (
		<div>
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
			<button onClick={handleSignin}>Sign In</button>
      <p><Link to={'/signup'}>Dont have an account? Click here to sign up</Link></p>
		</div>
	);
}
export default SignIn;
