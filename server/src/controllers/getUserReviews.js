import User from '../models/userSchema';

export const getUserReviews = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await User.findOne({ uid }).populate('reviews');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const reviews = user.reviews;

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Reviews Failed' });
    }
};
