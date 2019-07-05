const router = require("express").Router();

const postsRouter = require("./posts.routes");

router.use("/posts", postsRouter);

module.exports = router;
