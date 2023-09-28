import User from "../models/userSchema";
import Review from "../models/reviewSchema"

export const createReviewReaction = async (req, res, next) => {
    console.log('hit')
    try {
        const {uid, reviewID, reaction} = req.body

        const review = await Review.findById(reviewID)
        if(!review){
            return res.status(404).json({message: 'Review not found'})
        }
        const existingReactionIndex = review.reactions.findIndex(
            (r) => r.uid === uid
          );
      
          if (existingReactionIndex !== -1) {
            // User has already reacted, update their reaction
            review.reactions[existingReactionIndex].reaction = reaction;
          } else {
            // User has not reacted, add a new reaction
            review.reactions.push({ uid, reaction });
          }
      
          // Save the updated review
          await review.save();
      
          res.status(200).json({ message: 'Reaction updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Reaction Failed' });
    }
};

