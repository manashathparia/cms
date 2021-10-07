const mongoose = require("mongoose");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { getCommentsCount } = require("./comments.routes");
const { getPostsCount } = require("./posts.routes");
const router = require("express").Router();

const mediaModel = mongoose.model("Media");
const categoryModel = mongoose.model("Category");
// const commentsModel = mongoose.model("Comments");

router.get("/", isAuthenticated, async (req, res) => {
	const totalPosts = await getPostsCount(true, "post");
	const totalMedia = await mediaModel.countDocuments();
	const totalPages = await getPostsCount(true, "page");
	const totalCategories = await categoryModel.countDocuments();
	const totalComments = await getCommentsCount();

	res.json({
		totalPosts,
		totalPages,
		totalMedia,
		totalComments,
		totalCategories,
	});
});

module.exports = router;
