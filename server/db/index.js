const mongoose = require("mongoose");
const config = require("./db.config");

// require models
require("./models/post.model");
require("./models/category.model");
require("./models/images.model");
require("./models/comments.model");

module.exports.connect = () => {
	mongoose
		.connect(`mongodb://localhost:27017/cms`, {
			useNewUrlParser: true,
			useCreateIndex: true,
		})
		.then(() => console.log("Database connected"))
		.catch((e) => {
			console.error(e);
			process.exit(1);
		});
};
