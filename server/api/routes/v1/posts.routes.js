const express = require("express");
const { post } = require("../../controllers/posts.controller");

const router = express.Router();

router.get("/", post.getPosts);
router.post("/", post.savePost);
router.put("/:id", post.updatePost);
router.delete("/", post.deletePosts);

module.exports = router;
