import Post from '../models/postSchema'

export const getOnePost = async (req, res, next) => {
    const {postID} = req.params
    try {
       const post = await Post.findById({_id: postID})

       if (!post) {
           return res.status(404).json({ error: 'Post Not Found' });
       }

       res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Get Post Failed' });
    }
};