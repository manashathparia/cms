const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("Post");
const router = express.Router();

router
	.get("/", async (req, res) => {
		const { sort = [], query, id } = req.query;
		try {
			if (id) {
				const _post = await Post.findById(id)
					.populate("category")
					.exec();
				res.json({ success: true, data: _post });
			} else {
				const _posts = await Post.find(query)
					.populate("category")
					.sort([sort])
					.exec();
				res.json({ success: true, data: _posts });
			}
		} catch (e) {
			res.status(500).json({
				sucess: false,
				error: e.message || "Failed to retrive Posts from Database"
			});
		}
	})
	.post("/", async (req, res) => {
		try {
			const { slug } = req.body;
			if (slug) {
				// Search is there is existing post with the given slug. if exists then modify the slug, else save it.
				const postsWithSlug = await Post.find({ slug });

				if (postsWithSlug.length === 0) {
					const post = await Post.create(req.body);
					res.status(200).json({ success: true, post });
				} else {
					req.body.slug = `${slug}-${postsWithSlug.length + 1}`; // add 1 to the end of the slug
					await Post.create(req.body);

					// send the modified slug with the response to notify the edits in the frontend.
					res.status(200).json({
						success: true,
						modified: { slug: req.body.slug }
					});
				}
			} else {
				res.status(400).json({ success: false, error: "Slug is required" });
			}
		} catch (e) {
			res.status(500).json({
				success: false,
				error: {
					message: e.message || "Error while saving the Post into Database"
				}
			});
		}
	})
	.delete("/", async (req, res) => {
		const { ids } = req.query;
		if (!ids) {
			res.status(400).json({ success: false, error: "Bad delete request" });
		} else {
			await Post.deleteMany({ _id: { $in: ids.split(",") } });
			res
				.status(200)
				.json({ success: true, data: { deleted: ids.split(",") } });
		}
	})
	.put("/:id", async (req, res) => {
		const doc_id = req.params.id;
		if (mongoose.Types.ObjectId.isValid(doc_id)) {
			try {
				const post = await Post.findById(doc_id);
				if (post) {
					await Post.updateOne({ _id: doc_id }, req.body);
					res.json({ sucess: true, message: "Post updated sucessfully" });
				} else {
					res.status(404).json({
						success: false,
						error: `Post with id ${doc_id} not found`
					});
				}
			} catch (e) {
				res.status(500).json({
					sucess: false,
					error: e.message || "Error while updating the Post into Database"
				});
			}
		} else {
			res
				.status(400)
				.json({ success: false, error: `Invalid object ID: ${doc_id}` });
		}
	});

module.exports = router;
