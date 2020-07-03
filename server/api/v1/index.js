const router = require("express").Router();

const postsRouter = require("./posts.routes");
const categoryRouter = require("./category.routes");
const uploadsRouter = require("./media.routes");

router.use("/posts", postsRouter);
router.use("/categories", categoryRouter);
router.use("/media", uploadsRouter);

module.exports = router;
