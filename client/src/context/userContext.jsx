import React, { createContext, useState, useEffect } from 'react';
import { auth} from '../../../server/src/config/fireBase.config'; 
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsername = localStorage.getItem('username');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUsername) {
      setUsername(JSON.parse(storedUsername));
    }
    if (storedProfileImage !== 'undefined') {
      setProfileImage(JSON.parse(storedProfileImage));
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        setUsername(null);
      }
    });

    return () => {
      
      unsubscribe();
    };
  }, []);

  const handleSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      console.log('Successfully signed in:', user);
    } catch (error) {
      if(error.code === "auth/user-not-found"){
        toast.error('Email or Password not Found. Try Again!')
      } else if(error.code === "auth/wrong-password"){
        toast.error('Wrong Password. Try Again!')
      } else if(error.code === "auth/invalid-email"){
        toast.error("Invalid Email Format. Try Again!")
      }else if (error.code === "auth/too-many-requests"){
        toast.error("Too many failed attempts. Refresh and try again!")
      }
      console.error('Error signing innnn:', error.code);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('profileImage');
      
      setUser(null);
      setUsername(null);

      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const contextValue = {
    user,
    username,
    handleSignin,
    handleSignout,
	setUsername,
	setUser,
  profileImage,
  setProfileImage
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
