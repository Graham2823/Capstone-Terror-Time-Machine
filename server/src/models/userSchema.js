const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Review document's ObjectId
            ref: "Review", // The name of the model to which it refers (should match your Review model name)
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Review document's ObjectId
            ref: "Post", // The name of the model to which it refers (should match your Review model name)
        },
    ],
    profileImage:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);
