const express = require("express");
const { getAll, save, update } = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", save);
router.put("/:id", update);

module.exports = router;
