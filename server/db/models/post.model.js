const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = new mongoose.Schema({
	title: { type: String, default: "Untitled", minlength: 1 },
	slug: {
		type: String,
		required: [true, "slug is required"],
		unique: true,
		lowercase: true
	},
	createdAt: {
		type: String,
		default: moment().format("L, h:mm:ss a"),
		required: true
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	updatedAt: { type: String, default: moment().format("L") },
	body: String,
	featuredImage: String,
	tags: [String],
	category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
	status: {
		type: String,
		required: true,
		enum: ["published", "draft", "trashed"],
		default: "draft"
	}
});

PostSchema.pre("findOneAndUpdate", function(next) {
	// update the updatedAt date to the current date whenever an update to the document occurs
	// eslint-disable-next-line
	this._update.updatedAt = moment().format("L");
	next();
});

mongoose.model("Post", PostSchema);
