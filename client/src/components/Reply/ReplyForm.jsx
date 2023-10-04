import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const ReplyForm = ({reviewDetails, setReviewPosted}) => {
  const [reply, setReply] = useState('')
  const { reviewID } = useParams();
  const {username, user, profileImage} = useContext(UserContext)
  console.log(reply)

  const handleSubmit = async ()=>{
    setReviewPosted(true)
    const requestData = {
      uid: user.uid,
      username: username,
      reviewID: reviewID,
      replyText: reply,
      profileImage: profileImage
    };
    const response = await axios.post(
      'http://localhost:3001/api/reply',
      requestData
    );
    console.log(response.data)
    setReviewPosted(false)
  }
  console.log(reviewDetails)

  return (
      <div className="review-area" style={{marginBottom:"20px"}}>
        <h2 id="review">Leave a Reply</h2>
        <div className="review-card">
          <textarea
            id="reviewArea"
            rows="2"
            cols="50"
            placeholder="Enter your review here"
            style={{
              borderRadius: "5px",
              padding: "10px",
            }}
            onChange={(e)=>setReply(e.target.value)}
          />
          <button id="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  );
};

export default ReplyForm;
