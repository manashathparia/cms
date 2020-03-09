const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	dateCreated: { type: String, default: moment().format("L, h:mm:ss a") },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
	role: {
		type: String,
		enum: ["subscriber", "editor", "author", "administrator"],
		default: "subscriber"
	},
	specialAccess: [String]
});

mongoose.model("User", userSchema);
