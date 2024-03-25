const BlockedUser = require("../../models/blocked-user");
const User = require("../../models/user");

const blockUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (user) {
    const blockeduser = await BlockedUser.create({
      phonenumber: user.phonenumber,
    });
    if (blockeduser) {
      return res.status(200).json({ message: "User is Blocked Successfully" });
    }
  } else {
    return res.status(404).json({ message: "User Not Found!" });
  }
};

module.exports = {
  blockUser,
};
