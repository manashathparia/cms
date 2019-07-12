const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
		unique: true,
		minlength: 1
	},
	description: {
		type: String,
		minlength: 1
	}
});

mongoose.model("Category", categorySchema);
