import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './Post.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForumPostList({ posts, setPosts }) {
  const reversedPosts = [...posts].reverse();
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const handleDeletePost = (postID) => {
    axios
			.delete(`http://localhost:3001/api/deletePost/${user.uid}/${postID}`)
			.then((response) => {
				console.log("Post Deleted")
        const updatedPosts = posts.filter((post) => post._id !== postID);
        setPosts(updatedPosts);
        toast.success('Post Successfully Deleted')
			})
			.catch((error) => {
        toast.error('Post Could Not Be Deleted: Try Again!')
				console.error('Error fetching data:', error);
			});
  };

  return (
    <div className="reviews-section">
      <ToastContainer/>
      <h2>Posts</h2>
      <div className="post-container">
        {reversedPosts.map((post) => (
          <div className="post" key={post._id}>
            <div key={post._id}>
              <strong>{post.username}</strong>: {post.postText}
            </div>
            {user.uid == post.uid && (
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <div>
                  <FontAwesomeIcon icon={faTrash} />
                  </div>
                </button>
              )}
            <button className="reply-button" onClick={()=>navigate(`/postDetails/${post._id}`)}>Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ForumPostList;
