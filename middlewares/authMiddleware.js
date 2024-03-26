const jwt = require("jsonwebtoken");

const hasAuthToken = async (req, res, next) => {
    const token = req.header("authorization")?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "You dont have access" });
    } else {
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (verifiedToken) {
          next();
        } else {
          return res.status(403).json({ message: "Token is not verified" });
        }
      } catch (e) {
        next(e);
      }
    }
};

module.exports = hasAuthToken;
