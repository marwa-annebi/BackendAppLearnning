const express = require("express");
const { registerUser, loginUser, getUsers, deleteUser, CreateUser, UpdateUser } = require("../controllers/userController");

const router = express.Router();
router.route("/").post(registerUser);
router.route("/Login").post(loginUser);
router.route("/read").get(getUsers);
router.route("/remove/:id").delete(deleteUser)
router.route("/add").post(CreateUser)
router.route("/update/:id").put(UpdateUser)
module.exports = router;
