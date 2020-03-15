const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");

const uploadFileds = [
	{ name: "file", maxCount: 1 },
	{ name: "image", maxCount: 1 }
];
router.post("/image", fileUpload.fields(uploadFileds), (req, res) => {
	if (req.files.file) {
		res.json({
			...req.files.file[0],
			success: true,
			location: req.files.file[0].path.replace("public\\", "\\")
		});
	} else {
		res.json({
			...req.files.image[0],
			success: true
		});
	}
});

module.exports = router;
