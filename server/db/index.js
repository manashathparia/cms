const mongoose = require("mongoose");
const config = require("./db.config");

// require models
require("./models/post.model");
require("./models/category.model");
require("./models/images.model");
require("./models/comments.model");

module.exports.connect = () => {
	mongoose
		.connect(`mongodb://localhost/${config.database}`, {
			useNewUrlParser: true,
			useCreateIndex: true,
		})
		.then(() => console.log("Database connected"))
		.catch((e) => {
			// eslint-disable-next-line no-console
			console.error(e);
			process.exit(1);
		});
};
