const express = require("express");
const {blockUser} = require("../../controllers/v1/userController");
const router = express.Router();

router.put("/block-user/:id" ,blockUser );

module.exports = router;