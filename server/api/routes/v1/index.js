const router = require("express").Router();

const postsRouter = require("./posts.routes");
const categoryRouter = require("./category.route");

router.use("/posts", postsRouter);
router.use("/categories", categoryRouter);

module.exports = router;
