const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: "./public/uploads",
	filename: (req, file, cb) => {
		const _file = path.parse(file.originalname);
		cb(null, `${_file.name.split(" ").join("_")}-${Date.now()}${_file.ext}`);
	},
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
