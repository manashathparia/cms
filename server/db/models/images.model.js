const mongoose = require("mongoose");
const moment = require("moment");

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
	date: { type: String, default: moment().format("L") },
});

mongoose.model("Image", ImageSchema);
