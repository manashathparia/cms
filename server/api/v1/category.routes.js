const router = require("express").Router();
const mongoose = require("mongoose");

const Category = mongoose.model("Category");

router
	.route("/")
	.get(async (req, res) => {
		try {
			const _categories = await Category.find().sort({ $natural: -1 });
			res.json(_categories);
		} catch (e) {
			res
				.status(500)
				.json(e.message || "Error while retriving categories from database");
		}
	})
	.post(async (req, res) => {
		console.log(req.body);
		if (!req.body.category) {
			res.status(400).json("Category cannot be empty");
			return;
		}
		try {
			const categorySaved = await Category.create(req.body);
			res.json(categorySaved);
		} catch (e) {
			res.status(400).json(e.message);
		}
	});

router
	.route("/:category_id")
	.put(async (req, res) => {
		const {
			params: { category_id },
			body,
		} = req;
		try {
			if (category_id) {
				await Category.findByIdAndUpdate(category_id, body);
				res.json({ success: true });
			} else {
				res
					.status(400)
					.json({ success: false, error: "Invalid update request" });
			}
		} catch (e) {
			res.status(400).json({
				success: false,
				error: { message: e.message, stack: e.stack },
			});
		}
	})
	.delete(async (req, res) => {
		const {
			params: { category_id },
		} = req;
		try {
			if (category_id) {
				await Category.findByIdAndDelete(category_id);
				res.json({ success: true });
			} else {
				res
					.status(400)
					.json({ sucess: false, error: "Invalid delete request" });
			}
		} catch (e) {
			res.status(400).json({
				success: false,
				error: {
					message: e.message,
					stack: e.stack,
				},
			});
		}
	});

module.exports = router;
