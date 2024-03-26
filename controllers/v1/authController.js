const BlockedUser = require("../../models/blocked-user");
const User = require("../../models/user");
const registerValidator = require("../../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const blockedUser = await BlockedUser.findOne({
      phonenumber: req.body.phonenumber,
    });
    //1. check if user is blocked , prevent to register
    if (blockedUser) {
      return res.status(400).json({ message: "user is already blocked!" });
    }

    //2. incoming request cant meet validator requirement
    const registrationResult = registerValidator(req.body);

    if (registrationResult !== true) {
      return res.status(429).json(registrationResult);
    }
    const { username, email, password, phonenumber, name } = req.body;
    //3. check if user is registed before
    const isExistedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isExistedUser) {
      return res
        .status(409)
        .json({ message: "userName or Email is already exist" });
    }

    //4. create new user and add to DB
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await User.countDocuments({});

    const newUser = await User.create({
      name,
      username,
      email,
      phonenumber,
      password: hashedPassword,
      role: userCount > 0 ? "USER" : "ADMIN", // first user will be admin
    });

    //5. remove password in response to user
    const convertedUser = newUser.toObject();
    delete convertedUser.password;

    //6. create jwt token
    const accessToken = jwt.sign(
      { id: newUser._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "30 day" }
    );

    //7. send response
    res.status(201).json({ user: convertedUser, accessToken });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(401).json({ message: "User not Found!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "password is not valid!" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30 day" }
    );
    res.status(200).json({ accessToken });
  } catch (e) {
    next(e);
  }
};

const getMe = async (req, res) => {};

module.exports = {
  register,
  login,
  getMe,
};
