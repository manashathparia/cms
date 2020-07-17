const mongoose = require("mongoose");
const router = require("express").Router();

const Comments = mongoose.model("Comments");
const Post = mongoose.model("Post");

const getCount = async () => {
	const approved = await Comments.countDocuments({ status: "approved" });
	const waiting = await Comments.countDocuments({ status: "waiting" });
	const trash = await Comments.countDocuments({ status: "trash" });
	return { approved, waiting, trash };
};

router
	.route("/")
	.get(async (req, res) => {
		try {
			const docCount = await getCount();
			if (req.query.count) return res.json(docCount);
			const comments = await Comments.find()
				.populate("responseTo", "title slug")
				.sort({ $natural: -1 });

			res.send([comments, docCount]);
		} catch (e) {
			console.error(e);
			res.status(500).send(e.message);
		}
	})
	.post(async (req, res) => {
		try {
			const comment = await Comments.create(req.body);
			const { comments } = await (
				await Post.findById(req.body.responseTo)
					.select("comments")
					.exec()
			).toObject();
			await Post.findByIdAndUpdate(req.body.responseTo, {
				comments: [comment._id, ...comments],
			});
			res.send(comment);
		} catch (e) {
			console.error(e);
			res.status(500).send(e.message);
		}
	});

router
	.route("/:id")
	.get(async (req, res) => {
		const id = req.params.id;
		try {
			const comment = await Comments.findById(id);
			res.json(comment);
		} catch (e) {
			console.error(e);
			res.status(500).send("Error");
		}
	})
	.put(async (req, res) => {
		const id = req.params.id;
		const body = req.body;
		try {
			const updatedComment = await Comments.findByIdAndUpdate(id, body, {
				new: true,
			});
			const docCount = await getCount();
			res.send([updatedComment, docCount]);
		} catch (e) {
			console.error(e);
			res.status(500).send(e.message);
		}
	});

module.exports = router;
