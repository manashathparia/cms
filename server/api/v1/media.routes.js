const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");
const mongoose = require("mongoose");
const path = require("path");

const Image = mongoose.model("Image");

router
	.get("/", async (req, res) => {
		try {
			const media = await Image.find()
				.sort({ $natural: -1 })
				.exec();
			res.send(media);
		} catch (e) {
			res.send(e.message);
		}
	})
	.post("/", fileUpload.array("image", 10), async (req, res) => {
		const imageFileTypes = [".jpg", ".jpeg", ".png", ".webp"];
		try {
			if (req.files.length > 1) {
				const files = req.files.map((file) => {
					if (!imageFileTypes.includes(path.extname(file.originalname)))
						throw Error("Unsupported File type");
					return {
						...file,
						title: file.originalname,
					};
				});
				const img = await Image.insertMany(files);
				return res.json(img);
			}
			if (!imageFileTypes.includes(path.extname(req.files[0].originalname)))
				throw Error("Unsupported File type");
			const img = await Image.create({
				...req.files[0],
				...req.body,
				title: req.files[0].originalname,
			});
			res.json(img);
		} catch (e) {
			console.log(e);
			res.status(500).send(e.message);
		}
	})
	.delete("/", async (req, res) => {
		try {
			const ids = req.query.id;
			if (!ids) {
				res.status(400).send("Atleast one ID must be present");
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
