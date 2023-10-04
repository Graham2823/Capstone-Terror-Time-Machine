import Review from "../models/reviewSchema";
import Post from'../models/postSchema'

export const createForumPostReply = async (req, res, next) => {
    try {
        const { uid, username, postID, replyText } = req.body;

     
        if (!uid || !username || !postID || !replyText) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

  
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

    
       post.Replies.push({ uid, username, text: replyText });

      
        await post.save();

      
        const newReply = post.Replies[post.Replies.length - 1];

        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Add Reply Failed' });
    }
};
