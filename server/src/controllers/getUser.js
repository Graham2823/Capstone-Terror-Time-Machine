import User from "../models/userSchema";

export const findUser = async (req, res, next) => {
console.log('hit')
    try {
        const { uid } = req.params;
        console.log("uid", uid)
        const user = await User.findOne({ uid: uid });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Find User failed' });
    }
};
