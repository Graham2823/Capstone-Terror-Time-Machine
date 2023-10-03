const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	uid:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	postText: {
		type: String,
	},
	Replies: [
		{
			uid: {
				type: String,
				required: true
			},
			username:{
				type: String,
				required: true
			},
			text: {
				type: String,
				required: true
			},
			profileImage:{
				type:String,
				required: true,
			}
		}
	],
	profileImage:{
		type:String,
		required: true,
	}
});

module.exports = mongoose.model('Post', postSchema);