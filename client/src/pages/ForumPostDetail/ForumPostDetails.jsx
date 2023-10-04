import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ForumReplyForm from "../../components/ForumReply/ForumForm";
import ForumReplyCard from "../../components/ForumReplyCard/ForumReplyCard";
import ForumReviewCard from "../../components/ForumReviewCard/ForumReviewCard";

const ForumPostDetails = () => {
  const [postDetails, setPostDetails] = useState([]);
  const [forumReviewPosted, setForumReviewPosted] = useState(false);
  const { postID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getOnePost/${postID}`)
      .then((response) => {
        const reversedReplies = response.data.Replies.reverse();
        setPostDetails({ ...response.data, Replies: reversedReplies });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [forumReviewPosted]);

  console.log(postDetails);

  return (
    <div>
      {postDetails && Object.keys(postDetails).length > 0 && (
        <>
          <ForumReviewCard postDetails={postDetails} />
          <ForumReplyForm
            postDetails={postDetails}
            setForumReviewPosted={setForumReviewPosted}
          />
          <ForumReplyCard
            postDetails={postDetails}
            setPostDetails={setPostDetails}
            postID={postID}
          />
        </>
      )}
    </div>
  );
};

export default ForumPostDetails;
