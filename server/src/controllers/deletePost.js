import User from "../models/userSchema";
import Post from "../models/postSchema"


export const deletePost = async (req, res, next) => {
    try {
        const { uid, postID } = req.params;

        // Find and delete the review associated with the given reviewId
        const deletedPost = await Post.findByIdAndDelete(postID);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Now, find the user associated with the given uid
        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the reference to the deleted review from the user's "reviews" array
        user.posts.pull(postID);

        // Save the updated user document
        await user.save();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete Review Failed' });
    }
};