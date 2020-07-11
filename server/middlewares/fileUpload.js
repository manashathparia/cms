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

const fileUpload = multer({
	storage,
	fileFilter: function(req, file, callback) {
		const ext = path.extname(file.originalname);
		const imageFileTypes = [".jpg", ".jpeg", ".png", ".webp"];

		if (!imageFileTypes.includes(ext)) {
			req.fileValidationError = true;
			req.unsupportedFileType = ext;
			return callback(null, false);
		}
		callback(null, true);
	},
});

module.exports = fileUpload;
