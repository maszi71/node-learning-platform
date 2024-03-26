const jwt = require("jsonwebtoken");
const User = require("../models/user");
const isAdmin = async (req, res, next) => {
  try {
    const token = req.header("authorization").split(" ")[1];
    const decodeToken = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken.id);
    return user.role === "ADMIN"
      ? next()
      : res.status(403).json({ message: "you dont have access to this route" });
  } catch (e) {
    next(e);
  }
};

module.exports = isAdmin;
