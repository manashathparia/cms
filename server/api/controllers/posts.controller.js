const mongoose = require("mongoose");

const Post = mongoose.model("Post");

// Post controllers

const getPosts = async (req, res) => {
	const { sort = [], query, id } = req.query;
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
};

const savePost = async (req, res) => {
	try {
		const { slug } = req.body;
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
			res.status(400).json({ success: false, error: "Slug is required" });
		}
	} catch (e) {
		res.status(400).json({
			success: false,
			error: {
				message: e.message,
				stack: e.stack
			}
		});
	}
};

const updatePost = async (req, res) => {
	const doc_id = req.params.id;
	if (mongoose.Types.ObjectId.isValid(doc_id)) {
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
	} else {
		res
			.status(400)
			.json({ success: false, error: `Invalid object ID: ${doc_id}` });
	}
};

const deletePosts = async (req, res) => {
	const { ids } = req.query;
	console.log(ids);
	if (!ids) {
		res.status(400).json({ success: false, error: "Bad delete request" });
	} else {
		await Post.deleteMany({ _id: { $in: ids.split(",") } });
		res.status(200).json({ sucess: true, data: { deleted: ids.split(",") } });
	}
};

module.exports.post = { savePost, updatePost, getPosts, deletePosts };

// category controllers

const Category = mongoose.model("Category");

const getCategories = async (req, res) => {
	try {
		const _categories = await Category.find();
		res.json({ success: true, data: _categories });
	} catch (e) {
		res.status(400).json({
			success: false,
			error: {
				message: e.message,
				stack: e.stack
			}
		});
	}
};

const saveCategory = async (req, res) => {
	console.log(req.body);
	if (!req.body.category) {
		res.status(400).json({ success: false, error: "Category cannot be empty" });
		return;
	}
	try {
		await Category.create(req.body);
		res.json({ success: true, data: req.body });
	} catch (e) {
		res.status(400).json({
			success: true,
			error: {
				message: e,
				stack: e.stack
			}
		});
	}
};

const updateCategory = async (req, res) => {
	const {
		param: { category_id },
		body: { updateWith }
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
};

const deleteCategory = async (req, res) => {
	const { ids } = req.body;
	try {
		if (ids && Array.isArray(ids) && ids.length > 0) {
			await Category.deleteMany({ _id: { $in: ids } });
			res.json({ success: true });
		} else {
			res.status(400).json({ sucess: false, error: "Invalid delete request" });
		}
	} catch (e) {
		res.status(400).json({
			success: false,
			error: {
				message: e.message,
				stack: e.stack
			}
		});
	}
};

module.exports.category = {
	getCategories,
	saveCategory,
	updateCategory,
	deleteCategory
};
