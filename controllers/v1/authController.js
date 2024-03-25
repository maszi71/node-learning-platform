const BlockedUser = require("../../models/blocked-user");
const User = require("../../models/user");
const registerValidator = require("../../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

  const blockedUser = await BlockedUser.findOne({phonenumber : req.body.phonenumber});
  if(blockedUser) {
    return res.status(400).json({message : "user is already blocked!"})
  }

   //1. incoming request cant meet validator requirement
   const registrationResult = registerValidator(req.body);

  if (registrationResult !== true) {
    return res.status(429).json(registrationResult);
  }
  const { username, email, password, phonenumber, name } = req.body;
  //2. check if user is registed before
  const isExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isExistedUser) {
    return res
      .status(409)
      .json({ message: "userName or Email is already exist" });
  }

  //3. create new user and add to DB
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

  //4. remove password in response to user
  const convertedUser = newUser.toObject();
  delete convertedUser.password;

  //5. create jwt token
  const accessToken = jwt.sign(
    { id: newUser._id, name, email },
    process.env.JWT_SECRET,
    { expiresIn: "30 day" }
  );

  // send response
  res.status(201).json({ user: convertedUser, accessToken });
};

const login = async (req, res) => {};

const getMe = async (req, res) => {};

module.exports = {
  register,
  login,
  getMe,
};
