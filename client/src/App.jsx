import { useState, useEffect, useContext } from "react";
import "./App.css";
import CreateUser from "./pages/CreateUser/CreateUser";
import SignIn from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { Navigate } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import ContactPage from "./pages/ContactPage/ContactPage";
import ReviewDetail from "./pages/ReviewDetail/ReviewDetail";
import ForumPage from "./pages/Forum/Forum";
import ForumPostDetails from "./pages/ForumPostDetail/ForumPostDetails";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import MyProfile from "./pages/MyProfile/MyProfile";

function App() {
  const { user, setUser } = useContext(UserContext);
  const isSignupOrSignin = location.pathname === "/signup" || location.pathname === "/signin";

  const ProtectedRoute = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <Router>
      <>
        <h1>Terror Time Machine</h1>
        <p className="subHeader">Join horror movie enthusiasts in discussing top horror movies from the 80's!</p>
        {!isSignupOrSignin && <NavBar />}
        <Routes>
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movieDetail/:id"
            element={
              <ProtectedRoute user={user}>
                <MovieDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviewDetail/:reviewID"
            element={
              <ProtectedRoute user={user}>
                <ReviewDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute user={user}>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute user={user}>
                <ForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postDetails/:postID"
            element={
              <ProtectedRoute user={user}>
                <ForumPostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myProfile"
            element={
              <ProtectedRoute user={user}>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>
      </>
    </Router>
  );
}

export default App;
