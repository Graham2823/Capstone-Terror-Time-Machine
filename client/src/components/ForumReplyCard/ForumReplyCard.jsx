import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ForumReplyCard = ({ postDetails, setPostDetails, postID }) => {
  const { user } = useContext(UserContext);

  const handleDeleteReply = (forumReplyID) => {
    axios
      .delete(`http://localhost:3001/api/deleteReply/${postID}/${forumReplyID}`)
      .then((response) => {
        console.log('Reply Deleted');
        const updatedReplies = postDetails.Replies.filter(
          (forumReply) => forumReply._id !== forumReplyID
        );
        setPostDetails({ ...postDetails, Replies: updatedReplies });
      })
      .catch((error) => {
        console.error('Error deleting reply:', error);
      });
  };

  return (
    <div className="review-container">
      {postDetails && postDetails.Replies?.length > 0 ? (
        postDetails.Replies.map((forumReply) => (
          <div className="review" key={forumReply._id}>
            <div className="user-info">
              <h4 className="user-name">User: {forumReply.username}</h4>
            </div>
            {forumReply.text ? (
              <p>Comment: {forumReply.text}</p>
            ) : (
              <p>No Reply</p>
            )}
            {user.uid === forumReply.uid && (
              <button
                className="delete-button"
                onClick={() => handleDeleteReply(forumReply._id)}
                style={{ width: '50px' }}
              >
                {/* <FontAwesomeIcon icon={faTrash} /> */}
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No user replies yet. Start the conversation!</p>
      )}
    </div>
  );
};

export default ForumReplyCard;
