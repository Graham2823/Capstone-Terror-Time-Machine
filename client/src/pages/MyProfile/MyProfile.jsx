import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyProfile.css';


const MyProfile = () => {
  const {user, username, profileImage} = useContext(UserContext)
  const [userReviews, setUserReviews] = useState()
  const [userPosts, setUserPosts] = useState()
  const [showReviews, setShowReviews] = useState(true)
  const [movieTitles, setMovieTitles] = useState({})
  const [resolvedMovieTitles, setResolvedMovieTitles] = useState({});
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      axios.get(`${import.meta.env.VITE_API_URL}/getReviews/${user.uid}`)
      .then((response) => {
        setUserReviews(response.data.reverse());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      axios.get(`${import.meta.env.VITE_API_URL}/getUserPosts/${user.uid}`)
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
      .delete(`${import.meta.env.VITE_API_URL}/deleteReview/${user.uid}/${reviewID}`)
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
      .delete(`${import.meta.env.VITE_API_URL}/deletePost/${user.uid}/${postID}`)
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/movieByID/${movieID}`);
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
          {profileImage &&
              <img src={profileImage} alt="Profile image" className='profile-image-featured'/>
              }
            <div className="profile-buttons">
            <button onClick={() => setShowReviews(true)}>Reviews</button>
            <button onClick={() => setShowReviews(false)}>Posts</button>
            </div>
          </div>
          <div>
            {showReviews ? (
              userReviews.length > 0 ? ( 
              userReviews.map((review) => {
                const movieTitle = resolvedMovieTitles[review.movieID];
                return (
                  <div className="profile-review-container">
                  <div className="profile-review" key={review._id}>
                    <div>
                    <div className="user-info-profile">
                    {review.profileImage&&
                    <img src={review.profileImage} alt="Profile image" className='profile-image-small-box'/>
                      }
                      <h4 className="user-name">{review.username}</h4>
                      <h3 className="movie">Movie: {movieTitle}</h3>
                    </div>
                      <h3 className="review-star-rating">
                        ★ {review.Rating}/5
                      </h3>
                    </div>
                    {review.commentText && (
                      <p>Comment: {review.commentText}</p>
                    )}
                    <div className='reply-delete-profile'>
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
                  </div>
                );
              })
              ) : (
                <p>
                  You haven't left any reviews yet. Leave one on a movie!{' '}
                  <a href="/">Go to Movie List</a>
                </p>
              )
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div className="profile-review-container">
                <div className="profile-review" key={post._id}>
                  <div className="user-info-posts">
                  {post.profileImage&&
                  <img src={post.profileImage} alt="Profile image" className='profile-image-small'/>
                  }
                    <h4 className="user-name">{post.username}</h4>
                  </div>
                  {post.postText && (
                    <p>{post.postText}</p>
                  )}
                  <div className='reply-delete-profile'>
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
                </div>
              )) ) : (
                <p>
                  You haven't made any posts yet. Leave one on the <a href="/forum">General Forum.</a>{' '}
                </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};


export default MyProfile