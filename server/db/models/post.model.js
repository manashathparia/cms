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
	created: { type: Date, default: moment().format("L, h:mm:ss a") },
	author: { type: String },
	updatedAt: { type: Date, default: moment().format("L") },
	body: String,
	featuredImage: String,
	tags: [String],
	category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
	comments: [mongoose.Schema.Types.ObjectId],
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
