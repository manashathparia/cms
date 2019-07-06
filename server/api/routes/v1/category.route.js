const router = require("express").Router();
const { category } = require("../../controllers/posts.controller");

router
	.route("/")
	.get(category.getCategories)
	.post(category.saveCategory)
	.delete(category.deleteCategory);

router.put("/:category_id", category.updateCategory);

module.exports = router;
