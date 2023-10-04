export const searchedMovies = async (req, res, next) => {
    
    try {
        const {movieTitle} = req.params
        const fetchedMovies = [];
        const fetch = require('node-fetch');
        for (let i = 1; i <= 13; i++) {
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=popularity.desc&with_genres=27`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_AUTH
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();
            const filteredMovies = json.results.filter(movie => movie.title.toLowerCase().includes(movieTitle.toLowerCase()));
            fetchedMovies.push(...filteredMovies);
        }
        console.log("length", fetchedMovies.length)
        res.json(fetchedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Movies Failed' });
    }
};
