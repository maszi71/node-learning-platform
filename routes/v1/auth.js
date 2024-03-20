const express = require("express");
const { register, login, getMe } = require("../../controllers/v1/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);

module.exports = router;
