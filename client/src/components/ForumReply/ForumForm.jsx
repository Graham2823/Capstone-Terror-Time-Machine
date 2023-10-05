import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

const ForumReplyForm = ({postDetails, setForumReviewPosted}) => {
  const [forumReply, setForumReply] = useState('')
  const { postID } = useParams();
  const {username, user, profileImage} = useContext(UserContext)
  console.log(forumReply)

  const handleSubmit = async ()=>{
    setForumReviewPosted(true)
    const requestData = {
      uid: user.uid,
      username: username,
      postID: postID,
      replyText: forumReply,
      profileImage:profileImage
    };
    const response = await axios.post(
      'http://localhost:3001/api/forumreply',
      requestData
    );
    console.log(response.data)
    setForumReviewPosted(false)
  }
  console.log(postDetails)

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
            onChange={(e)=>setForumReply(e.target.value)}
          />
          <button id="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  );
};

export default ForumReplyForm;
