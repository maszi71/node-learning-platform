const express = require("express");
const {blockUser , getAllUsers , removeUser , updateRole , updateProfile} = require("../../controllers/v1/userController");
const isAdmin = require("../../middlewares/isAdminMiddleware");
const hasAuthToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.put("/block-user/:id" , hasAuthToken ,isAdmin ,blockUser );
router.route("/").get(hasAuthToken ,isAdmin , getAllUsers).put(hasAuthToken,updateProfile);
router.delete("/:id" , hasAuthToken , isAdmin , removeUser);
router.put("/role/:id" , hasAuthToken , isAdmin, updateRole);


module.exports = router;