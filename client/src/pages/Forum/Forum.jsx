import React, { useState, useContext, useEffect } from "react";
import ForumPostList from "../../components/Post/Post";
import { UserContext } from '../../context/userContext';
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import './Forum.css'


function ForumPage() {
  const [postContent, setPostContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const { user, username } = useContext(UserContext);

useEffect(()=>{
  axios
			.get(`http://localhost:3001/api/getPosts`)
			.then((response) => {
				setForumPosts(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
},[])


  const handlePostSubmit = async() => {
    const requestData = {
      uid: user.uid,
      username: username,
      postText: postContent
    };
    const response = await axios.post(
      'http://localhost:3001/api/createPost',
      requestData
    );
    console.log(response.data)
    setForumPosts([requestData, ...forumPosts]);
    setPostContent("");
  };

  return (

    <div>
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
