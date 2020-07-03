const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");
const mongoose = require("mongoose");

const Image = mongoose.model("Image");

router
	.get("/", async (req, res) => {
		try {
			const media = await Image.find();
			res.send(media);
		} catch (e) {
			res.send(e);
		}
	})
	.post("/", fileUpload.array("image", 10), async (req, res) => {
		try {
			if (req.files.length > 1) {
				const img = await Image.insertMany(req.files);
				return res.json(img);
			}
			const img = await Image.create({ ...req.files[0], ...req.body });
			res.json(img);
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
	})
	.delete("/", async (req, res) => {
		try {
			const ids = req.query.id;
			if (!ids) {
				res.status(400).json({ success: false, error: "Bad delete request" });
			} else {
				await Image.deleteMany({ _id: { $in: ids.split(",") } });
				res.status(200).json({ deleted: ids.split(",") });
			}
		} catch (e) {
			console.log(e);
			res.status(500).send("Internal server error");
		}
	});

module.exports = router;
