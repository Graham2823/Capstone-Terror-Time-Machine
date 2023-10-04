import Review from "../models/reviewSchema";

export const getReview = async (req, res, next) => {
    try {
       const {reviewID} = req.params
       const review = await Review.findOne({ _id: reviewID });

       if (!review) {
           return res.status(404).json({ error: 'Review not found' });
       }

       res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Reviews Failed' });
    }
};
