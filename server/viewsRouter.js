const router = require("express").Router();
const mongoose = require("mongoose");

const Postmodel = mongoose.model("Post");

router.get("/", async (req, res) => {
	const posts = await Postmodel.find({ status: "published" });
	console.log(posts);
	res.render("index", { title: "Blog", posts });
});

router.get("/:slug", async (req, res) => {
	const post = await Postmodel.findOne({ slug: req.params.slug });
	console.log(post);
	res.render("article", { title: post ? post.title : "aa", post });
});

module.exports = router;
