const express = require("express");
const {blockUser} = require("../../controllers/v1/userController");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const hasAuthToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.put("/block-user/:id" , hasAuthToken ,isAdmin ,blockUser );

module.exports = router;