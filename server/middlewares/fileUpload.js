const multer = require("multer");
const path = require("path");

const date = new Date();

const storage = multer.diskStorage({
	destination: `./public/uploads/${date.getFullYear()}/${date.getMonth()}`,
	filename: (req, file, cb) => {
		const _file = path.parse(file.originalname);
		cb(null, `${_file.name.split(" ").join("_")}-${Date.now()}${_file.ext}`);
	},
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
