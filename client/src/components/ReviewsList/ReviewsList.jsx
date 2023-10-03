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
        toast.error('Review Could Not Be Deleted: Try Again!')
			});
  };

  const handleLike = async (reviewID) => {
    if (!likedReviews.includes(reviewID) && !dislikedReviews.includes(reviewID)) {
      const requestData = {
        uid: user.uid,
        reviewID: reviewID,
        reaction: 'Like',
      };
      const response = await axios.post(
        'http://localhost:3001/api/reviewReaction',
        requestData
      );

      localStorage.setItem(`liked_${reviewID}`, true);

      setReaction('Like');
      setLikedReviews([...likedReviews, reviewID]);

      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewID) {
          review.reactions.push({ uid: user.uid, reaction: 'Like' });
        }
        return review;
      });
      
      const alreadyLiked = localStorage.getItem(`liked_${reviewID}`);

      setReviews(updatedReviews);
    }
  };

    
  const handleDislike = async (reviewID) => {
    if (!likedReviews.includes(reviewID) && !dislikedReviews.includes(reviewID)) {
      const requestData = {
        uid: user.uid,
        reviewID: reviewID,
        reaction: 'Dislike',
      };
      const response = await axios.post(
        'http://localhost:3001/api/reviewReaction',
        requestData
      );

      localStorage.setItem(`disliked_${reviewID}`, true);

      setReaction('Dislike');
      setDislikedReviews([...dislikedReviews, reviewID]);

      const updatedReviews = reviews.map((review) => {
        if (review._id === reviewID) {
          review.reactions.push({ uid: user.uid, reaction: 'Dislike' });
        }
        return review;
      });

      setReviews(updatedReviews);
    }
  };
 
    return (
    <div className="reviews-section">
      <ToastContainer/>
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
                    <FontAwesomeIcon
                      className={`icon-up ${localStorage.getItem(`liked_${review._id}`) ? 'liked' : ''}`}
                      icon={faThumbsUp}
                      onClick={() => handleLike(review._id)}
                    />
                    <span>{review.reactions.filter((reaction) => reaction.reaction === 'Like').length}</span>
                    <FontAwesomeIcon
                      className={`icon-down ${localStorage.getItem(`disliked_${review._id}`) ? 'disliked' : ''}`}
                      icon={faThumbsDown}
                      onClick={() => handleDislike(review._id)}
                    />
                    <span>{review.reactions.filter((reaction) => reaction.reaction === 'Dislike').length}</span>
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