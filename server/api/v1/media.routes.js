const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");
const mongoose = require("mongoose");

const Image = mongoose.model("Image");

const uploadFileds = [
	{ name: "file", maxCount: 1 },
	{ name: "image", maxCount: 1 },
];

router
	.get("/", async (req, res) => {
		try {
			const medias = await Image.find();
			res.send(medias);
		} catch (e) {
			res.send(e);
		}
	})
	.post("/", fileUpload.fields(uploadFileds), async (req, res) => {
		try {
			const img = await Image.create({ ...req.files.image[0], ...req.body });
			res.json(img);
		} catch (e) {
			console.log(e);
		}
	});

module.exports = router;
