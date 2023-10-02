import React from 'react';
import './NavBar.css'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const NavBar = () => {
  const {handleSignout} = useContext(UserContext)
  return (
    <nav>
      <ul>
        <li><a href="/">Homepage</a></li>
        <li><a href="/forum">General Forum</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/myProfile">My Profile</a></li>
        <li onClick={handleSignout}><a href='/signin'>Signout</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
