const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = new mongoose.Schema({
	title: { type: String, default: "Untitled", minlength: 1 },
	slug: {
		type: String,
		required: [true, "slug is required"],
		unique: true,
		lowercase: true,
	},
	date: {
		type: String,
		default: moment().format("L"),
		required: true,
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	updatedAt: { type: String, default: moment().format("L") },
	body: String,
	featuredImage: {
		type: {
			url: String,
			altText: String,
		},
	},
	tags: [String],
	category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
	status: {
		type: String,
		required: true,
		enum: ["published", "draft", "trashed"],
		default: "draft",
	},
	type: {
		type: String,
		enum: ["post", "page"],
		default: "post",
		required: true,
	},
});

PostSchema.pre("findOneAndUpdate", function(next) {
	// update the updatedAt date to the current date whenever an update to the document occurs
	// eslint-disable-next-line
	this._update.updatedAt = moment().format("L");
	next();
});

// PostSchema.pre("save", function(next) {
// 	console.log(this);
// 	if (this.category.length <= 0) {
// 		mongoose
// 			.model("Category")
// 			.find({ category: "Uncategorised" })
// 			.then((res) => {
// 				if (res.length === 0) {
// 					mongoose
// 						.model("Category")
// 						.create({ category: "Uncategorised" })
// 						.then((cat) => {
// 							console.log(cat);
// 							this.category = [cat._id];
// 							next();
// 						});
// 				} else {
// 					this.category = [res[0]._id];
// 					next();
// 				}
// 			});
// 	} else next();
// });

mongoose.model("Post", PostSchema);
