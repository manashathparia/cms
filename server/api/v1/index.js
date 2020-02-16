const router = require("express").Router();

const postsRouter = require("./posts.routes");
const categoryRouter = require("./category.routes");
const uploadsRouter = require("./uploads.routes");

router.use("/posts", postsRouter);
router.use("/categories", categoryRouter);
router.use("/upload", uploadsRouter);

module.exports = router;
