const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
	filename: { type: String, required: true, unique: true },
	path: { type: String, required: true, unique: true },
	mimetype: { type: String, required: true },
	thumbnails: [String],
	size: String,
	destination: String,
	description: String,
});

mongoose.model("Image", ImageSchema);
