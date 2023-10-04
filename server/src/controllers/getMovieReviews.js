import Review from "../models/reviewSchema"

export const getMovieReviews = async (req, res, next) => {
   
    try {
        const { movieID } = req.params;
        const movie = await Review.find({ movieID : movieID });
        
        if (!movie) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Reviews Failed' });
    }
};