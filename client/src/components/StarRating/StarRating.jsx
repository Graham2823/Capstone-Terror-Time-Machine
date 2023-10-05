import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ onRatingChange, rating, setRating }) => {

  const handleStarClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={value <= rating ? 'star active' : 'star'}
          onClick={() => handleStarClick(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
