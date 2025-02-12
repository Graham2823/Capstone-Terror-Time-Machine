import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortMovies from '../../components/FilterMovies/FilterMovies';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
	const { username, profileImage } = useContext(UserContext);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredMovies, setFilteredMovies] = useState(null);
	const [pagnatedMovies, setPagnatedMovies] = useState([]);
	const [loadingMovies, setLoadingMovies] = useState(false);
  console.log("profile image", profileImage)
	const [totalPages, setTotalPages] = useState(1);
	const moviesPerPage = 20;
	const startIndex = (currentPage - 1) * moviesPerPage;
	const endIndex = startIndex + moviesPerPage;
	const paginatedSortedMovies =
		filteredMovies !== null ? filteredMovies.slice(startIndex, endIndex) : [];
	const maxPages = Math.ceil((filteredMovies?.length || 0) / moviesPerPage);

console.log(import.meta.env.VITE_API_URL)

	useEffect(() => {
		axios
		  .get(`${import.meta.env.VITE_API_URL}/moviesByPage/${currentPage}`)
		  .then((response) => {
			setPagnatedMovies(response.data);
			setTotalPages(Math.ceil(response.data.length / moviesPerPage));
		  })
		  .catch((error) => {
			console.error('Error fetching data:', error);
		  });
	  }, [currentPage, moviesPerPage]);

	const handleSearch = (query) => {
		console.log('Searching for:', query);
	};

	const handleNextPage = () => {
		if (currentPage < 13) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div>
			<div className='user-details'>
			{profileImage&&
             <img src={profileImage} alt="Profile image" className='profile-image-main'/>
              }
			<h2>Hello {username}!</h2>
			</div>
			<div className='sort'>
				<SortMovies
					onSearch={handleSearch}
					setFilteredMovies={setFilteredMovies}
					setLoadingMovies={setLoadingMovies}
				/>
			</div>
			<div className='search-bar'>
				<SearchBar
					onSearch={handleSearch}
					setFilteredMovies={setFilteredMovies}
					setLoadingMovies={setLoadingMovies}
				/>
			</div>
			<div className='top-page-buttons'>
				<div>
					<button onClick={handlePrevPage} disabled={currentPage === 1}>
						Previous Page
					</button>
					<button
						onClick={handleNextPage}
						disabled={
							(filteredMovies === null && currentPage === 13) ||
							(filteredMovies !== null && currentPage === maxPages)
						}>
						Next Page
					</button>
				</div>
			</div>
			<div className='movie-list'>
				{loadingMovies ? (
					<h3>
						<LoadingSpinner /> Loading Movies
					</h3>
				) : (
					<MovieGrid
						movies={
							filteredMovies !== null ? paginatedSortedMovies : pagnatedMovies
						}
					/>
				)}
			</div>
			<div>
				<button onClick={handlePrevPage} disabled={currentPage === 1}>
					Previous Page
				</button>
				<button
						onClick={handleNextPage}
						disabled={
							(filteredMovies === null && currentPage === 13) ||
							(filteredMovies !== null && currentPage === maxPages)
						}>
						Next Page
					</button>
			</div>
			{filteredMovies === null ?(
			<div className='page-numbers'>
  				Page {currentPage} of {13}
			</div>
			):(
			<div className='page-numbers'>
  				Page {currentPage} of {maxPages}
			</div>
			)}
		</div>
	);
};

export default HomePage;
