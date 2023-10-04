import Review from "../models/reviewSchema";

export const createReply = async (req, res, next) => {
    try {
        const { uid, username, reviewID, replyText, profileImage } = req.body;

     
        if (!uid || !username || !reviewID || !replyText) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

  
        const review = await Review.findById(reviewID);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

    
        review.Replies.push({ uid, username, text: replyText, profileImage });

      
        await review.save();

      
        const newReply = review.Replies[review.Replies.length - 1];

        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Add Reply Failed' });
    }
};
