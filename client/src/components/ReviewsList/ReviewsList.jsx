import React, {useContext, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ReviewsList.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsList = ({ reviews, setReviews, setReaction }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);

  const handleDeleteReview = (reviewID) => {
    axios
      .delete(`http://localhost:3001/api/deleteReview/${user.uid}/${reviewID}`)
      .then((response) => {
        console.log("review Deleted")
        const updatedReviews = reviews.filter((review) => review._id !== reviewID);
        setReviews(updatedReviews);
        toast.success('Review Deleted!')
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Review Could Not Be Deleted: Please refresh and try again!')
      });
  };

  
  
  const handleLike = async (reviewID) => {
    try {
      const requestData = {
        uid: user.uid,
        reviewID: reviewID,
        reaction: 'Like',
      };
  
      const response = await axios.post(
        'http://localhost:3001/api/reviewReaction',
        requestData
      );
  
      // Find the specific review that matches the reviewID
      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewID) {
          // Check if the user already had a reaction
          const existingReactionIndex = review.reactions.findIndex(
            (reaction) =>
              reaction.uid === user.uid &&
              (reaction.reaction === 'Like' || reaction.reaction === 'Dislike')
          );
  
          if (existingReactionIndex !== -1) {
            // User already had a reaction, update it
            review.reactions[existingReactionIndex].reaction = 'Like';
          } else {
            // User didn't have a reaction, add a new one
            review.reactions.push({ uid: user.uid, reaction: 'Like' });
          }
        }
        return review;
      });
  
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };
  
  const handleDislike = async (reviewID) => {
    try {
      const requestData = {
        uid: user.uid,
        reviewID: reviewID,
        reaction: 'Dislike',
      };
  
      const response = await axios.post(
        'http://localhost:3001/api/reviewReaction',
        requestData
      );
  
      // Find the specific review that matches the reviewID
      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewID) {
          // Check if the user already had a reaction
          const existingReactionIndex = review.reactions.findIndex(
            (reaction) =>
              reaction.uid === user.uid &&
              (reaction.reaction === 'Like' || reaction.reaction === 'Dislike')
          );
  
          if (existingReactionIndex !== -1) {
            // User already had a reaction, update it
            review.reactions[existingReactionIndex].reaction = 'Dislike';
          } else {
            // User didn't have a reaction, add a new one
            review.reactions.push({ uid: user.uid, reaction: 'Dislike' });
          }
        }
        return review;
      });
  
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error disliking review:', error);
    }
  };
 
  return (
    <div className="reviews-section">
      <ToastContainer />
      <h2>User Reviews</h2>
      <div className="review-container">
        {reviews.length > 0 && user ? (
          reviews.map((review) => (
            <div className="review" key={review._id}>
              <div className="user-info">
              {review.profileImage&&
              <img src={review.profileImage} alt="Profile image" className='profile-image-small'/>
              }
                <h4 className="user-name">{review.username}</h4>
                <h3 className="review-star-rating">★ {review.Rating}/5</h3>
              </div>
              <div className="divider"></div>
              {review.commentText ? (
                <>
                  <p>Comment: {review.commentText}</p>
                  <div className="thumbs">
                    <FontAwesomeIcon
                      className={`${
                        review.reactions &&
                        review.reactions.some(
                          (reaction) =>
                            reaction.uid === user.uid &&
                            reaction.reaction === 'Like'
                        )
                          ? 'liked'
                          : ''
                      }`}
                      icon={faThumbsUp}
                      onClick={() => handleLike(review._id)}
                    />
                    <span className="like-count">
                      {review.reactions &&
                        review.reactions.filter(
                          (reaction) => reaction.reaction === 'Like'
                        ).length}
                    </span>
                    <FontAwesomeIcon
                      className={`${
                        review.reactions &&
                        review.reactions.some(
                          (reaction) =>
                            reaction.uid === user.uid &&
                            reaction.reaction === 'Dislike'
                        )
                          ? 'disliked'
                          : ''
                      }`}
                      icon={faThumbsDown}
                      onClick={() => handleDislike(review._id)}
                    />
                    <span className="like-count">
                      {review.reactions &&
                        review.reactions.filter(
                          (reaction) => reaction.reaction === 'Dislike'
                        ).length}
                    </span>
                  </div>
                </>
              ) : (
                <p>No Review</p>
              )}
              <div className='reply-delete'>
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
              <button
                className="reply-button"
                onClick={() => navigate(`/reviewDetail/${review._id}`)}
              >
                Reply
              </button>
            </div>
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