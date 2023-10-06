import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

const ReplyCard = ({reviewDetails, setReviewDetails, reviewID}) => {
  const {user} = useContext(UserContext)
  const handleDeleteReply = (replyID) =>{
    axios
			.delete(`${import.meta.env.VITE_API_URL}/deleteReply/${reviewID}/${replyID}`)
			.then((response) => {
				console.log("reply Deleted")
        const updatedReplies = reviewDetails.Replies.filter((reply) => reply._id !== replyID);
      setReviewDetails({ ...reviewDetails, Replies: updatedReplies });
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
  }
  return (
    <div className="review-container">
  {reviewDetails && reviewDetails.Replies?.length > 0 ? (
    reviewDetails.Replies.map((reply) => (
            <div className="review" key={reply._id}>
              <div className="user-info-post">
              {reply.profileImage&&
              <img src={reply.profileImage} alt="Profile image" className='profile-image-small'/>
              }
                <h4 className="user-name">{reply.username}</h4>
              </div>
              {reply.text ? (
                <>
                  <p>Comment: {reply.text}</p>
                </>
              ) : (
                <p>No Reply</p>
              )}
              {user.uid == reply.uid && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReply(reply._id)}
                  style={{width: "50px"}}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No user replies yet. Start the conversation!</p>
        )}
      </div>
  )
}

export default ReplyCard