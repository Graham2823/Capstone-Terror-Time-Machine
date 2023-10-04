import Post from '../models/postSchema'

export const getPosts = async (req, res, next) => {
    try {
       const posts = await Post.find({})

       if (!posts) {
           return res.status(404).json({ error: 'No Posts Found' });
       }

       res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get All Reviews Failed' });
    }
};