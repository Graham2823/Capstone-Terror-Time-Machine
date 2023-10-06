import React, { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';

const SearchBar = ({ onSearch, setFilteredMovies, setLoadingMovies }) => {
  const [query, setQuery] = useState('');
 

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      setLoadingMovies(true)
    const changedQuery = query.trim().toLowerCase();
    axios
			.get(`${import.meta.env.VITE_API_URL}/movies/${changedQuery}`)
			.then((response) => {
				setFilteredMovies(response.data);
        setLoadingMovies(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
};

const clearSearch = () =>{
  setQuery('')
  setFilteredMovies(null)
}

  return (
    <form>
      <input
        type="text"
        placeholder="Search for movie..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>Search</button>
      <button onClick={clearSearch}>Clear Search</button>
    </form>
  );
};

export default SearchBar;