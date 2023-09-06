import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const HomePage = () => {
	const { setUser, user } = useContext(UserContext);

	return (
		<>
			<div>
				<h1>Terror Time Machine</h1>
				<h1>User: {user}</h1>
				<h2>Movies:</h2>
			</div>
		</>
	);
};

export default HomePage;
