export const moviesByPage = async (req, res, next) => {
   
    const { page } = req.params;
    if (isNaN(page)) {
      return res.status(400).json({ error: 'Invalid page number' });
    }
    try {
      const fetch = require('node-fetch');
  
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=popularity.desc&with_genres=27`;
  
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH,
        },
      };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      res.json(data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  };
  
