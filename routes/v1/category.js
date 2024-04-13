const express = require("express");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const hasAuthToken = require("../../middlewares/authMiddleware");
const { createNewCategory , getAllCategories,updateCategory,removeCategory } = require("../../controllers/v1/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories).post(hasAuthToken , isAdmin , createNewCategory);
router.route("/:id").put(hasAuthToken , isAdmin, updateCategory).delete(hasAuthToken , isAdmin, removeCategory);

module.exports = router;