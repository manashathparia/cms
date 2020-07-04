const router = require("express").Router();
const mongoose = require("mongoose");

const Category = mongoose.model("Category");

router
	.route("/")
	.get(async (req, res) => {
		try {
			const _categories = await Category.find();
			res.json({ success: true, data: _categories });
		} catch (e) {
			res.status(500).json({
				success: false,
				error: {
					message:
						e.message || "Error while retriving categories from database",
				},
			});
		}
	})
	.post(async (req, res) => {
		console.log(req.body);
		if (!req.body.category) {
			res
				.status(400)
				.json({ success: false, error: "Category cannot be empty" });
			return;
		}
		try {
			const categorySaved = await Category.create(req.body);
			res.json({ success: true, data: categorySaved });
		} catch (e) {
			res.status(400).json({
				success: true,
				error: {
					message: e,
					stack: e.stack,
				},
			});
		}
	})
	.delete(async (req, res) => {
		const { ids } = req.body;
		try {
			if (ids && Array.isArray(ids) && ids.length > 0) {
				await Category.deleteMany({ _id: { $in: ids } });
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

router.put("/:category_id", async (req, res) => {
	const {
		param: { category_id },
		body: { updateWith },
	} = req;
	try {
		if (category_id && updateWith) {
			await Category.updateOne({ _id: category_id }, { category: updateWith });
			res.json({ success: true });
		} else {
			res.status(400).json({ success: false, error: "Invalid update request" });
		}
	} catch (e) {
		res
			.status(400)
			.json({ success: false, error: { message: e.message, stack: e.stack } });
	}
});

module.exports = router;
