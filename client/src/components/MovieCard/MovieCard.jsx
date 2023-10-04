import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, year, image, id }) => {
  const navigate = useNavigate()
  return (
    <div className="movie-card">
      <h2 className="movie-title">{title}</h2>
      <img src={image} alt={title} onClick={()=>navigate(`/movieDetail/${id}`)}/>
      <div className="movie-info">
        <p>Year: {year}</p>
      </div>
      <button onClick={()=>navigate(`/movieDetail/${id}`)}>Discuss</button>
    </div>
  );
};

export default MovieCard;
