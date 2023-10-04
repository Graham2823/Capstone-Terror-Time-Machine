import Review from "../models/reviewSchema";


export const deleteReply = async (req, res, next) => {
    try {
        const { reviewID, replyID } = req.params;

        // Find and delete the review associated with the given reviewId
        const review = await Review.findById(reviewID);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.Replies.pull(replyID);

        // Save the updated user document
        await review.save();

        res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete Reply Failed' });
    }
};
