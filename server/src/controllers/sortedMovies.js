export const sortedMovies = async (req, res, next) => {
    
    try {
        const { sort } = req.params;
        const fetchedMovies = [];
        let sortedMovies = [];
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
            fetchedMovies.push(...json.results);
        }

        if (sort === 'A-Z') {
            sortedMovies = fetchedMovies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'Z-A') {
            sortedMovies = fetchedMovies.sort((a, b) => b.title.localeCompare(a.title));
        } else {
            sortedMovies = fetchedMovies.filter((movie) => movie.release_date.startsWith(sort));
        }
        
        res.json(sortedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Movies Failed' });
    }
};
