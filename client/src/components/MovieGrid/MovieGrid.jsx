import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies }) => {
   
  return (
    <div className="movie-grid">
      {movies.length > 0 ? 
      movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          id={movie.id}
          year={movie.release_date.substring(0, 4)}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      )):
      <h2>No Movies Found</h2>
      }
    </div>
  );
};

export default MovieGrid;
