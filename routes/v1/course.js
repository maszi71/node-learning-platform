const express = require("express");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const hasAuthToken = require("../../middlewares/authMiddleware");
const { createNewCourse  } = require("../../controllers/v1/courseController");
const uploader = require("../../utils/uploader")

const router = express.Router();
router.route("/").post(hasAuthToken , isAdmin , uploader.single("cover"), createNewCourse);

module.exports = router;