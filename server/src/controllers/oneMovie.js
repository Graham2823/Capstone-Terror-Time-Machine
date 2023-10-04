export const oneMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_AUTH
            }
        };

        const response = await fetch(url, options);
        const movieDetails = await response.json();
        console.log(movieDetails);
        res.json(movieDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get Movie Details Failed' });
    }
};
