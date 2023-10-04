import React from 'react';
import './MovieDetailCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, year, image, id, overview, runtime, genres, tagline }) => {
  const navigate = useNavigate()

  const formattedReleaseDate = new Date(year).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="movie-detail-card">
      <img src={image} alt={title} />
      <div className="movie-info">
        <h2>{title}</h2>
        {tagline && <p className="tagline">{tagline}</p>}
        <p>Release Date: {formattedReleaseDate}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
        <p><b>Overview:</b> {overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;