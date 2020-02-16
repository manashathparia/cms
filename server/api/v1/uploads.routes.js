const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");

router.post("/image", fileUpload.single("image"), (req, res) => {
	console.log(req.file);
	res.json({ ...req.file, sucess: true });
});

module.exports = router;
