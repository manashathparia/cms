const router = require("express").Router();
const fileUpload = require("../../middlewares/fileUpload");
const mongoose = require("mongoose");
const imageThumbnails = require("../../lib/imageThumbnails");
const isAuthenticated = require("../../middlewares/isAuthenticated");

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
	.post(
		"/",
		isAuthenticated,
		fileUpload.array("image", 10),
		async (req, res) => {
			try {
				if (req.fileValidationError)
					throw Error(`Unsupported file type "${req.unsupportedFileType}"`);
				if (req.files.length > 1) {
					const promises = [];
					const files = req.files.map((file) => {
						promises.push(imageThumbnails(file));
						return {
							...file,
							title: file.originalname,
						};
					});
					const thumb = await Promise.all(promises);
					const _files = files.map((file, i) => ({
						...file,
						thumbnails: thumb[i],
					}));
					const img = await Image.insertMany(_files);
					return res.json(img);
				}

				const thumbnails = await imageThumbnails(req.files[0]);
				const img = await Image.create({
					...req.files[0],
					...req.body,
					thumbnails,
					title: req.files[0].originalname,
				});
				res.json(img);
			} catch (e) {
				console.log(e);
				res.status(500).send(e.message);
			}
		}
	)
	.delete("/", isAuthenticated, async (req, res) => {
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

router.put("/:id", async (req, res) => {
	try {
		const ImageID = req.params.id;
		const updated = await Image.findByIdAndUpdate(ImageID, req.body, {
			new: true,
		});
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
