const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	uid:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	movieID: {
		type: String,
		required: true,
	},
	Rating: {
		type: Number,
		required: true,
	},
	commentText: {
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
		}
	],
	reactions:[
		{
			uid: {
				type: String,
				required: true
			},
			reaction:{
				type: String,
				required: true
			}
		}

	]
});

module.exports = mongoose.model('Review', reviewSchema);
