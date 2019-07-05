const mongoose = require("mongoose");
const asyncHandler = require("../../middlewares/errorHandler");

const Post = mongoose.model("Post");

module.exports.getAll = async (req, res, next) => {
	const { sort = [], query } = req.query;
	try {
		const data = await Post.find(query)
			.populate("category")
			.sort([sort])
			.exec();
		if (data.length === 0) {
			next(Error("No posts found"));
		} else {
			res.error();
			res.json(data);
		}
	} catch (e) {
		res.status(400).json({ sucess: false, message: e.message });
	}
};

module.exports.save = asyncHandler(async (req, res) => {
	const {
		body: { slug }
	} = req;

	try {
		if (slug) {
			// Search is there is existing post with the given slug. if exists then modify the slug else save it.
			const postsWithSlug = await Post.find({ slug });

			if (postsWithSlug.length === 0) {
				await Post.create(req.body);
				res.status(200).json({ success: true });
			} else {
				req.body.slug = `${slug}-${postsWithSlug.length + 1}`;
				await Post.create(req.body);

				// send the modified slug with the response to notify the edits in the frontend.
				res.status(200).json({
					success: true,
					modified: { slug: req.body.slug }
				});
			}
		} else {
			throw Error("Slug is required");
		}
	} catch (err) {
		//console.error(err);
		//res.status(400).json({ sucess: false, message: err.message });
		throw err;
	}
});

exports.update = async (req, res) => {
	try {
		const doc_id = req.params.id;
		if (mongoose.Types.ObjectId.isValid(doc_id)) {
			const post = await Post.findById(doc_id);
			if (post) {
				await Post.updateOne({ _id: doc_id }, req.body);
				res.json({ sucess: true, message: "Post updated sucessfully" });
			} else {
				res.status(400).json({
					success: false,
					message: `Post with id ${doc_id} not found`
				});
			}
		} else {
			throw new Error("Invalid Object ID");
		}
	} catch (e) {
		console.error(e);
		res.status(400).json({ success: false, message: e.message });
	}
};
