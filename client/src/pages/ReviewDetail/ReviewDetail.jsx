import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReplyForm from '../../components/Reply/ReplyForm';
import ReplyCard from '../../components/ReplyCard/ReplyCard';

const ReviewDetail = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const [reviewPosted, setReviewPosted] = useState(false)
  const { reviewID } = useParams();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/review/${reviewID}`)
      .then((response) => {
        const reversedReplies = response.data.Replies.reverse();
      setReviewDetails({ ...response.data, Replies: reversedReplies });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewPosted]);

  return (
    
    <div>
     {reviewDetails && Object.keys(reviewDetails).length > 0 && (
        <>
        <ReviewCard reviewDetails={reviewDetails}/>
        <ReplyForm reviewDetails={reviewDetails} setReviewPosted={setReviewPosted}/>
        <ReplyCard reviewDetails={reviewDetails} setReviewDetails={setReviewDetails} reviewID={reviewID}/>
        </>
      )}
    </div>
  );
};

export default ReviewDetail;
