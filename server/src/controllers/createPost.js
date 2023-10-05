import User from "../models/userSchema";
import Post from "../models/postSchema";

export const createPost = async (req, res, next) => {
   
    try {
        const { uid, username, postText,profileImage } = req.body;
        const newPost = new Post({ uid, username, postText,profileImage });
    
        await newPost.save();

        const user = await User.findOne({ uid });
    
        user.posts.push(newPost._id);
    
        await user.save();
    
        res.status(201).json({ message: 'Post added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Create Post Failed' });
    }
};