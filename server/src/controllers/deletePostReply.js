import Post from "../models/postSchema";

export const deletePostReply = async (req, res, next) => {
    try {
        const { postID, postReplyID } = req.params;

        // Find and delete the review associated with the given reviewId
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.Replies.pull(postReplyID);

        // Save the updated user document
        await post.save();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete Reply Failed' });
    }
};