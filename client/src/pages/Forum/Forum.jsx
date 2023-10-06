import React, { useState, useContext, useEffect } from "react";
import ForumPostList from "../../components/Post/Post";
import { UserContext } from '../../context/userContext';
import axios from "axios";
import './Forum.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForumPage() {
  const [postContent, setPostContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const [postMade, setPostMade] = useState(false)
  const { user, username, profileImage } = useContext(UserContext);

useEffect(()=>{
  setPostMade(false)
  axios
  .get(`${import.meta.env.VITE_API_URL}/getPosts`)
  .then((response) => {
    setForumPosts(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
},[postMade])


const handlePostSubmit = async() => {
  const requestData = {
    uid: user.uid,
    username: username,
    postText: postContent,
    profileImage:profileImage
  };
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/createPost`,
    requestData
    );
    setPostMade(true)
    console.log(response.data)
    setForumPosts([requestData, ...forumPosts]);
    setPostContent("");
    toast.success("Post Successfully Added!")
  };

  return (

    <div>
      <ToastContainer/>
      <h2 id="review">Create a Forum Post</h2>
      <div>
        <div className="post-card">
        <textarea
          id="reviewArea"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post here"
          style={{
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: "rgb(114, 114, 114)",
            height: "150px"
          }}
        />
        <button id="submit" onClick={handlePostSubmit}>Submit</button>
        </div>
        <ForumPostList posts={forumPosts.reverse()} setPosts={setForumPosts} />
      </div>
    </div>
  );
  
}

export default ForumPage;
