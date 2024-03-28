const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { findUserId } = require("../utils/user");
const isAdmin = async (req, res, next) => {
  try {
    const userId = findUserId(req);
    const user = await User.findById(userId);
    return user.role === "ADMIN"
      ? next()
      : res.status(403).json({ message: "you dont have access to this route" });
  } catch (e) {
    next(e);
  }
};

module.exports = isAdmin;
