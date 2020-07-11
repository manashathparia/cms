const router = require("express").Router();

const postsRouter = require("./posts.routes");
const categoryRouter = require("./category.routes");
const uploadsRouter = require("./media.routes");
const authRouter = require("./auth.routes");

router.use("/posts", postsRouter);
router.use("/categories", categoryRouter);
router.use("/media", uploadsRouter);
router.use("/auth", authRouter);

module.exports = router;
