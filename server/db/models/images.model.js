const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	location: { type: String, required: true, unique: true },
	thumbnailName: [String],
	type: String,
	size: String
});

mongoose.model("Image", ImageSchema);
