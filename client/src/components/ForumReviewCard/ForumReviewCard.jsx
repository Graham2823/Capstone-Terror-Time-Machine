import React from 'react'

const ForumReviewCard = ({postDetails}) => {
  console.log(postDetails)
  return (
    <div className="review" style={{ margin: "20px auto" }}>
        <div className="user-info">
          <h4 className="user-name">User: {postDetails.username}</h4>
        </div>
        {postDetails.postText ? (
          <>
            <p>Comment: {postDetails.postText}</p>
          </>
        ) : (
          <p>No Review</p>
        )}
      </div>
  )
}

export default ForumReviewCard