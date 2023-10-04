import User from "../models/userSchema";
import Review from "../models/reviewSchema"

export const createReview = async (req, res, next) => {
   
    try {
        const { uid, username, movieID, Rating, commentText, profileImage } = req.body;
        const newReview = new Review({ uid, username, movieID, Rating, commentText, profileImage });
    
        await newReview.save();

        const user = await User.findOne({ uid });
    
        user.reviews.push(newReview._id);
    
        await user.save();
    
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Movies Failed' });
    }
};

