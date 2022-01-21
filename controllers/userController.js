const asyncHandler = require("express-async-handler");
const { is } = require("express/lib/request");
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
  const { first_name, email, password,isTeacher,isAdmin } = req.body;

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
  const { first_name, email, password, isAdmin, isTeacher } = req.body;

  const user = await User.findById(req.params.id);


  if (user) {
    user.first_name = first_name;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    user.isTeacher = isTeacher;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getUsers, deleteUser, CreateUser,UpdateUser };
