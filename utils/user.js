const jwt = require("jsonwebtoken");

const findUserId = (req) => {
  const token = req.header("authorization").split(" ")[1];
  return jwt.decode(token, process.env.JWT_SECRET).id;
};

module.exports = {findUserId} ;
