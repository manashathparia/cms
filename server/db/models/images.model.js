const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
	title: { type: String, required: true },
	caption: String,
	alt_text: String,
	filename: { type: String, required: true, unique: true },
	path: { type: String, required: true, unique: true },
	mimetype: { type: String, required: true },
	thumbnails: [String],
	size: String,
	destination: String,
	description: String,
});

mongoose.model("Image", ImageSchema);
