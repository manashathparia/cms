const express = require("express");
const mongoose = require("mongoose");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const Post = mongoose.model("Post");
const router = express.Router();

async function getCount(authenticated, type) {
	if (!authenticated) return undefined;
	const published = await Post.countDocuments({ status: "published", type });
	const draft = await Post.countDocuments({ status: "draft", type });
	const trashed = await Post.countDocuments({ status: "trashed", type });
	return {
		published,
		draft,
		trashed,
	};
}

router
	.get("/", async (req, res, next) => {
		const {
			sort,
			slug,
			id,
			embed,
			per_page = 10,
			page = 0,
			filter = "",
			status = "published",
			type, //post or page
		} = req.query;
		const authenticated = isAuthenticated(req, res, next, false);
		console.log(status);
		const _status = authenticated
			? status === "all"
				? ["published", "draft"]
				: status.split(",")
			: ["published"];
		const _filter = filter.split(",").join(" ");

		try {
			const query = JSON.parse(JSON.stringify({ status: _status, slug, type })); //get rid of undefied fields
			const count = await getCount(authenticated, query.type);
			if (id) {
				const _post = await Post.findById(id)
					.skip(Number(page) * Number(per_page))
					.limit(Number(per_page))
					.select(_filter)
					.populate(embed ? ["category"] : [])
					.populate("comments")
					.populate(embed ? "author" : "", "username")
					.exec();
				res.json(_post);
			} else {
				let _posts = await Post.find({ ...query })
					.skip(Number(page) * Number(per_page))
					.limit(Number(per_page))
					.select(_filter)
					.populate(embed ? ["category"] : [])
					.populate("comments")
					.populate(embed ? "author" : "", "username")
					.sort(sort || { $natural: -1 })
					.exec();
				res.json({ posts: _posts, count });
			}
		} catch (e) {
			console.error(e);
			res.status(500).send("Failed to retrive Posts from Database");
		}
	})
	.post("/", isAuthenticated, async (req, res) => {
		try {
			const { slug } = req.body;
			if (slug) {
				// Search if there is existing post with the given slug. if exists then modify the slug, else save it.
				const postsWithSlug = await Post.find({ slug });

				if (postsWithSlug.length === 0) {
					const post = await Post.create(req.body);
					res.status(200).json(post);
				} else {
					req.body.slug = `${slug}-${postsWithSlug.length + 1}`; // add 1 to the end of the slug
					await Post.create(req.body);

					// send the modified slug with the response to notify the edits in the frontend.
					res.status(200).json(req.body.slug);
				}
			} else {
				res.status(400).send("slug cannot be empty");
			}
		} catch (e) {
			console.error(e);
			res.status(500).send("Error while saving the Post into Database");
		}
	})
	.delete("/", isAuthenticated, async (req, res) => {
		const { ids } = req.query;
		if (!ids) {
			res.status(400).send("Atleast one ID must be present");
		} else {
			await Post.deleteMany({ _id: { $in: ids.split(",") } });
			res
				.status(200)
				.json({ success: true, data: { deleted: ids.split(",") } });
		}
	})
	.put("/trash", isAuthenticated, async (req, res) => {
		try {
			const { ids } = req.query;
			await Post.updateMany(
				{ _id: { $in: ids.split(",") } },
				{ $set: { status: "trashed" } },
				{ multi: true }
			);
			res.sendStatus(200);
		} catch (e) {
			console.error(e);
			res.status(500).send(e.message);
		}
	})
	.put("/:id", isAuthenticated, async (req, res) => {
		const doc_id = req.params.id;
		if (mongoose.Types.ObjectId.isValid(doc_id)) {
			try {
				const post = await Post.findById(doc_id);
				if (post) {
					await Post.updateOne({ _id: doc_id }, req.body);
					res.json({
						_id: doc_id,
					});
				} else {
					res.status(404).send(`Post with id ${doc_id} not found`);
				}
			} catch (e) {
				console.error(e);
				res.status(500).send("Error while updating the Post into Database");
			}
		} else {
			res.status(400).send(`Invalid object ID: ${doc_id}`);
		}
	});

module.exports = router;
module.exports.getPostsCount = getCount;
