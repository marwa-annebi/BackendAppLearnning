const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { first_name, email, password, isTeacher, pic } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    first_name,
    email,
    password,
    isTeacher,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      email: user.email,
      isTeacher: user.isTeacher,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured !!!");
  }

  res.json({
    first_name,
    email,
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      email: user.email,
      isTeacher: user.isTeacher,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or Password !!!");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user Removed" });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});

const CreateUser = asyncHandler(async (req, res) => {
  const { first_name, email, password, isTeacher, isAdmin } = req.body;

  if (!first_name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const user = new User({
      first_name: first_name,
      email: email,
      password: password,
      isTeacher: isTeacher,
      isAdmin: isAdmin,
    });

    const createdUser = await user.save();

    res.status(201).json(createdUser);
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    const update = await updatedUser.save();

    res.send(update);
  } catch (error) {
    console.error(error);
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const update = await user.save();

    res.json({
      _id: update._id,
      first_name: update.first_name,
      email: update.email,
      pic: update.pic,
      isAdmin: update.isAdmin,
      token: generateToken(update._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  CreateUser,
  UpdateUser,
  updateUserProfile,
};
