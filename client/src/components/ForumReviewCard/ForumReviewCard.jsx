import React from 'react'

const ForumReviewCard = ({postDetails}) => {
  return (
    <div className="review" style={{ margin: "20px auto" }}>
        <div className="user-info">
          <h4 className="user-name">User: {postDetails.username}</h4>
        </div>
        {postDetails.commentText ? (
          <>
            <p>Comment: {postDetails.commentText}</p>
          </>
        ) : (
          <p>No Review</p>
        )}
      </div>
  )
}

export default ForumReviewCard