const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	authorName: { type: String, required: true, minlength: 1 },
	authorEmail: { type: String, required: true },
	content: { type: String, required: true },
	responseTo: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
	parent: { type: mongoose.Types.ObjectId, ref: "Comments" },
	date: { type: Date, default: new Date() },
	status: {
		type: String,
		enum: ["approved", "waiting", "trash"],
		default: "waiting",
	},
});

mongoose.model("Comments", CommentSchema);
