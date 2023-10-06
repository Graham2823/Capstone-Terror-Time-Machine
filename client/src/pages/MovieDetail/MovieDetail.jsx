import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieDetailCard from '../../components/MovieDetailCard/MovieDetailCard';
import './MovieDetail.css';
import Reviews from '../../components/Reviews/Reviews';
import ReviewsList from '../../components/ReviewsList/ReviewsList';

const MovieDetail = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState();
  	const [reviews, setReviews] = useState([])
	const [reviewMade, setReviewMade] = useState(false)
	const [reaction, setReaction] = useState('Like')

	console.log("reviews", reviews)
	
	const handleReviewSubmit = (newReview) => {
		setReviews([newReview, ...reviews]); 
	};
	
	useEffect(() => {
		setReviewMade(false)
		axios
		.get(`${import.meta.env.VITE_API_URL}/movieByID/${id}`)
		.then((response) => {
			setMovie(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, [id]);
	
	useEffect(()=>{
		axios
		.get(`${import.meta.env.VITE_API_URL}/movieReviews/${id}`)
		.then((response) => {
			const reversedReviews = response.data.reverse();
			setReviews(reversedReviews);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
		
	},[reviewMade, reaction])

	return (
		<div>
			{movie && (
				<>
					<div className='movie-container'>
						<h1>{movie.title}</h1>
						<MovieDetailCard
							title={movie.title}
							year={movie.release_date}
							image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							id={movie.id}
							overview={movie.overview}
							runtime={movie.runtime}
							genres={movie.genres}
							tagline={movie.tagline}
						/>
					</div>
					<Reviews movieID={movie.id} onReviewSubmit={handleReviewSubmit} setReviewMade={setReviewMade}/>
					<ReviewsList reviews={reviews} setReviews={setReviews} setReaction= {setReaction}/>
				</>
			)}
		</div>
	);
};

export default MovieDetail;
