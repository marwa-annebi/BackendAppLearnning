const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");

const {
  CreateCourse,
  getCourses,
  getCourseById,
  UpdateCourse,
  DeleteCourse,
} = require("../controllers/courseController");
const router = express.Router();
router.route("/").get(protect, getCourses);
router.route("/create").post(protect, CreateCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(protect, UpdateCourse)
  .delete(protect, DeleteCourse);

module.exports = router;
