const router = require("express").Router();

const postsRouter = require("./posts.routes");
const categoryRouter = require("./category.routes");
const uploadsRouter = require("./media.routes");
const authRouter = require("./auth.routes");
const commentsRouter = require("./comments.routes");

router.use("/posts", postsRouter);
router.use("/categories", categoryRouter);
router.use("/media", uploadsRouter);
router.use("/auth", authRouter);
router.use("/comments", commentsRouter);

module.exports = router;
