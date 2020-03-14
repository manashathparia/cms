const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: "./public/uploads",

	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${new Date()}${path.extname(file.originalname)}`
		);
	}
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
