import React, { useState, useContext } from "react";
import StarRating from "../StarRating/StarRating"
import './Reviews.css';
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reviews( {movieID, onReviewSubmit, setReviewMade }) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const {user, username} = useContext(UserContext)
  console.log(username, user.uid)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async() => {
    const requestData = {
      uid: user.uid,
      username: username,
      movieID: movieID,
      Rating: rating,
      commentText: commentText
    };
    const response = await axios.post(
      'http://localhost:3001/api/review',
      requestData
    );
    console.log(response.data)
    onReviewSubmit(requestData);
    setCommentText(""); 
    setRating(0);
    setReviewMade(true)
    toast.success('Review Posted!')
  };

  return (
    <div className="review-area">
      <ToastContainer/>
      <h2 id="review">
        Leave a Review</h2>
      <div className="review-card">
        <textarea
          id="reviewArea"
          rows="2"
          cols="50"
          placeholder="Enter your review here"
          value={commentText}
          onChange={handleInputChange}
          style={{
            borderRadius: "5px",
            padding: "10px",
          }}
        />
        <div className="star-rating-container">
        <StarRating onRatingChange={handleRatingChange} />
        </div>
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Reviews;
