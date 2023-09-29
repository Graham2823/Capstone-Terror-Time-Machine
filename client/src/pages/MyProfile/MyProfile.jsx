import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        setUserReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      axios.get(`http://localhost:3001/api/getUserPosts/${user.uid}`)
      .then((response) => {
        setUserPosts(response.data);
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
      // If the title is already fetched, return it from state
      return movieTitles[movieID];
    } else {
      try {
        const response = await axios.get(`http://localhost:3001/api/movieByID/${movieID}`);
        const movieTitle = response.data.title;
        // Store the movie title in state for future use
        setMovieTitles((prevTitles) => ({
          ...prevTitles,
          [movieID]: movieTitle,
        }));
        return movieTitle;
      } catch (error) {
        console.error('Error fetching data:', error);
        return ''; // Return an empty string or handle the error as needed
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
            <button onClick={() => setShowReviews(true)}>Reviews</button>
            <button onClick={() => setShowReviews(false)}>Posts</button>
          </div>
          <div>
            {showReviews ? (
              userReviews.map((review) => {
                const movieTitle = resolvedMovieTitles[review.movieID];
                return (
                  <div className="review" key={review._id}>
                    <div className="user-info">
                      <h4 className="user-name">User: {review.username}</h4>
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
                    <button onClick={() => navigate(`/reviewDetail/${review._id}`)}>View Discussion</button>
                  </div>
                );
              })
            ) : (
              userPosts.map((post) => (
                <div className="review" key={post._id}>
                  <div className="user-info">
                    <h4 className="user-name">User: {post.username}</h4>
                  </div>
                  {post.postText && (
                    <p>Comment: {post.postText}</p>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <div>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </button>
                  <button onClick={() => navigate(`/postDetails/${post._id}`)}>View Discussion</button>
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