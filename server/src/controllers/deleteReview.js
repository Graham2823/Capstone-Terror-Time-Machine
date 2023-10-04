import User from "../models/userSchema";
import Review from "../models/reviewSchema";


export const deleteReview = async (req, res, next) => {
    try {
        const { uid, reviewID } = req.params;

        // Find and delete the review associated with the given reviewId
        const deletedReview = await Review.findByIdAndDelete(reviewID);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Now, find the user associated with the given uid
        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the reference to the deleted review from the user's "reviews" array
        user.reviews.pull(reviewID);

        // Save the updated user document
        await user.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete Review Failed' });
    }
};
