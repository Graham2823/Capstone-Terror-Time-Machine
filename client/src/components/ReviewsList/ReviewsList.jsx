import React, {useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ReviewsList.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';


const ReviewsList = ({ reviews, setReviews, setReaction }) => {
  const navigate = useNavigate()
   const { user } = useContext(UserContext); 
  const handleDeleteReview = (reviewID) => {
    axios
			.delete(`http://localhost:3001/api/deleteReview/${user.uid}/${reviewID}`)
			.then((response) => {
				console.log("review Deleted")
        const updatedReviews = reviews.filter((review) => review._id !== reviewID);
        setReviews(updatedReviews);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
  };

  const handleLike = async(reviewID) =>{
    const requestData = {
      uid: user.uid,
      reviewID: reviewID,
      reaction: 'Like'
    };
    const response = await axios.post(
      'http://localhost:3001/api/reviewReaction',
      requestData
      );
      
      setReaction('Like')
      console.log(response.data)
      // Create a copy of the reviews array with updated reactions
  const updatedReviews = reviews.map((review) => {
    if (review._id === reviewID) {
      review.reactions.push({ uid: user.uid, reaction: 'Like' });
    }
    return review;
  });

  // Update the reviews state with the new array
  setReviews(updatedReviews);
    }
    
    const handleDislike = async (reviewID) =>{
      const requestData = {
        uid: user.uid,
        reviewID: reviewID,
        reaction: "Dislike"
      };
      const response = await axios.post(
        'http://localhost:3001/api/reviewReaction',
        requestData
        );
        setReaction('Dislike')
        console.log(response.data)
        const updatedReviews = reviews.map((review) => {
          if (review._id === reviewID) {
            review.reactions.push({ uid: user.uid, reaction: 'Dislike' });
          }
          return review;
        });
      
        // Update the reviews state with the new array
        setReviews(updatedReviews);
  }
 
    return (
    <div className="reviews-section">
      <h2>User Reviews</h2>
      <div className="review-container">
        {reviews.length > 0 && user ? (
          reviews.map((review) => (
            <div className="review" key={review._id}>
              <div className="user-info">
                <h4 className="user-name">User: {review.username}</h4>
                <h3 className="review-star-rating">
                  ★ {review.Rating}/5
                </h3>
              </div>
              {review.commentText ? (
                <>
                  <p>Comment: {review.commentText}</p>
                  <div className="thumbs">
                    <FontAwesomeIcon className="icon-up" icon={faThumbsUp} onClick={()=>handleLike(review._id)} />
                    <FontAwesomeIcon className="icon-down" icon={faThumbsDown} onClick={()=>handleDislike(review._id)} />
                  </div>
                </>
              ) : (
                <p>No Review</p>
              )}
              {user.uid == review.uid && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <div>
                  <FontAwesomeIcon icon={faTrash} />
                  </div>
                </button>
              )}
              <button className="reply-button" onClick={() => navigate(`/reviewDetail/${review._id}`)}>Reply</button>
            </div>
          ))
        ) : (
          <p>No user reviews yet. Start the conversation!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;