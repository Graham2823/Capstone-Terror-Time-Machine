import React, { useState } from 'react';
import './FilterMovies.css';
import axios from 'axios';

const SortMovies = ({ setFilteredMovies, setLoadingMovies }) => {
  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortSubmit = (event) => {
    event.preventDefault();
    setLoadingMovies(true);
      axios
        .get(`http://localhost:3001/api/sortedMovies/${sortBy}`)
        .then((response) => {
          setFilteredMovies(response.data);
          setLoadingMovies(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  };

  const clearSort = () => {
    setSortBy('');
    setFilteredMovies(null);
  };

  const years = Array.from({ length: 10 }, (_, i) => 1980 + i); 
  
  return (
    <form>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="">Sort by Year/Alphabetical</option>
        <option value="A-Z">Title: A-Z</option>
        <option value="Z-A">Title: Z-A</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button type="submit" onClick={handleSortSubmit}>
        Sort
      </button>
      <button onClick={clearSort}>Clear Sort</button>
    </form>
  );
};

export default SortMovies;


