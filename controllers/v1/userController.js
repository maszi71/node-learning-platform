const BlockedUser = require("../../models/blocked-user");
const User = require("../../models/user");
const { ADMIN, USER } = require("../../constants/role");
const { isValidObjectId } = require("mongoose");
const profileValidator = require("../../validators/profile");
const jwt = require("jsonwebtoken");
const {findUserId} = require("../../utils/user");

const blockUser = async (req, res, next) => {
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const isValidId = isValidObjectId(userId);
    if (!isValidId) {
      return res.status(409).json({ message: "Id is not Valid" });
    }
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "user is deleted successfully" });
  } catch (e) {
    next(e);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const isValidId = isValidObjectId(userId);
    if (!isValidId) {
      return res.status(409).json({ message: "Id is not Valid" });
    }
    if (role === ADMIN || role === USER) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { role: role } }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User Not Found" });
      }
      return res
        .status(200)
        .json({ message: "user role is updated successfully" });
    } else {
      res.status(404).json({ message: "Role is not Valid" });
    }
  } catch (e) {
    next(e);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const isValidProfile = profileValidator(req.body);
    if (isValidProfile !== true) {
      return res.status(429).json(isValidProfile);
    }
    const userId = findUserId(req);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        ...req.body,
      },
      { new: true }
    ).select("-password");
    return res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  blockUser,
  getAllUsers,
  removeUser,
  updateRole,
  updateProfile,
};
