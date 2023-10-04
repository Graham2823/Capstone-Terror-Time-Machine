import User from "../models/userSchema";

export const createUser = async (req, res, next) => {
    
    try {
        const { uid, username, profileImage } = req.body;
        const newUser = new User({
            uid: uid,
            username: username
        });

        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User creation failed' });
    }
};
