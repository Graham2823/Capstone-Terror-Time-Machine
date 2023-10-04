import User from '../models/userSchema';

export const getUserPosts = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await User.findOne({ uid }).populate('posts');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = user.posts;

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All User Posts Failed' });
    }
};
