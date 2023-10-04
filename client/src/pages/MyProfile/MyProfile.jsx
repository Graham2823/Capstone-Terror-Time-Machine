import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieDetailCard from '../../components/MovieDetailCard/MovieDetailCard';
import './MyProfile.css';


const MyProfile = () => {
  const {user, username} = useContext(UserContext)
  const [userReviews, setUserReviews] = useState()
  const [userPosts, setUserPosts] = useState()
  const [showReviews, setShowReviews] = useState(true)
  const [movieTitles, setMovieTitles] = useState({})
  const [resolvedMovieTitles, setResolvedMovieTitles] = useState({});
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      axios.get(`http://localhost:3001/api/getReviews/${user.uid}`)
      .then((response) => {
        setUserReviews(response.data.reverse());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      axios.get(`http://localhost:3001/api/getUserPosts/${user.uid}`)
      .then((response) => {
        setUserPosts(response.data.reverse());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  },[])

  const handleDeleteReview = (reviewID) => {
    axios
      .delete(`http://localhost:3001/api/deleteReview/${user.uid}/${reviewID}`)
      .then((response) => {
        console.log("review Deleted")
        const updatedReviews = userReviews.filter((review) => review._id !== reviewID);
        setUserReviews(updatedReviews);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeletePost = (postID) => {
    axios
      .delete(`http://localhost:3001/api/deletePost/${user.uid}/${postID}`)
      .then((response) => {
        console.log("Post Deleted")
        const updatedPosts = userPosts.filter((post) => post._id !== postID);
        setUserPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getMovieTitle = async (movieID) => {
    if (movieTitles[movieID]) {
      return movieTitles[movieID];
    } else {
      try {
        const response = await axios.get(`http://localhost:3001/api/movieByID/${movieID}`);
        const movieTitle = response.data.title;
        setMovieTitles((prevTitles) => ({
          ...prevTitles,
          [movieID]: movieTitle,
        }));
        return movieTitle;
      } catch (error) {
        console.error('Error fetching data:', error);
        return ''; 
      }
    }
  };

  useEffect(() => {
    if (userReviews) {
      const fetchMovieTitles = async () => {
        const titles = await Promise.all(
          userReviews.map(async (review) => {
            const movieTitle = await getMovieTitle(review.movieID);
            return { [review.movieID]: movieTitle };
          })
        );
        const resolvedTitles = titles.reduce((acc, titleObj) => ({ ...acc, ...titleObj }), {});
        setResolvedMovieTitles(resolvedTitles);
      };

      fetchMovieTitles();
    }
  }, [userReviews]);

  console.log(userReviews)
  console.log(userPosts)
  
  return (
    <div>
      {user && userReviews && userPosts && (
        <>
          <div>
            <h1>{username}</h1>
            <div className="profile-buttons">
            <button onClick={() => setShowReviews(true)}>Reviews</button>
            <button onClick={() => setShowReviews(false)}>Posts</button>
            </div>
          </div>
          <div>
            {showReviews ? (
              userReviews.map((review) => {
                const movieTitle = resolvedMovieTitles[review.movieID];
                return (
                  <div className="profile-review-container">
                  <div className="profile-review" key={review._id}>
                    <div className="user-info">
                      <h4 className="user-name">{review.username}</h4>
                      <h4 className="user-name">Movie: {movieTitle}</h4>
                      <h3 className="review-star-rating">
                        ★ {review.Rating}/5
                      </h3>
                    </div>
                    {review.commentText && (
                      <p>Comment: {review.commentText}</p>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      <div>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </button>
                    <button className="discussion-button" onClick={() => navigate(`/reviewDetail/${review._id}`)}>View Thread</button>
                  </div>
                  </div>
                );
              })
            ) : (
              userPosts.map((post) => (
                <div className="profile-review-container">
                <div className="profile-review" key={post._id}>
                  <div className="user-info">
                    <h4 className="user-name">{post.username}</h4>
                  </div>
                  {post.postText && (
                    <p>{post.postText}</p>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <div>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </button>
                  <button className="discussion-button" onClick={() => navigate(`/postDetails/${post._id}`)}>View Thread</button>
                </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};


export default MyProfile