import React from 'react'

const ReviewCard = ({reviewDetails}) => {
  return (
    <div className="review" style={{ margin: "20px auto" }}>
        <div className="user-info">
        {reviewDetails.profileImage&&
              <img src={reviewDetails.profileImage} alt="Profile image" className='profile-image'/>
              }
          <h4 className="user-name">{reviewDetails.username}</h4>
          <h3 className="review-star-rating">
            ★ {reviewDetails.Rating}/5
          </h3>
        </div>
        {reviewDetails.commentText ? (
          <>
            <p>Comment: {reviewDetails.commentText}</p>
          </>
        ) : (
          <p>No Review</p>
        )}
      </div>
  )
}

export default ReviewCard