const express = require("express");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const hasAuthToken = require("../../middlewares/authMiddleware");
const {
  createNewCourse,
  createNewSession,
  getCourse,
  getSession
} = require("../../controllers/v1/courseController");
const uploader = require("../../utils/uploader");

const router = express.Router();
router
  .route("/")
  .post(
    hasAuthToken,
    isAdmin,
    uploader("image", "covers", 1024 * 1024 * 2).single("cover"),
    createNewCourse
  );
router.route("/:id").get(hasAuthToken,getCourse)
router
  .route("/:id/session")
  .post(
    hasAuthToken,
    isAdmin,
    uploader("video", "videos", 1024 * 1024 * 10).single("video"),
    createNewSession
  );
router.route("/session/:id").get(hasAuthToken,getSession)

module.exports = router;
