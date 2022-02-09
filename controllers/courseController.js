const Course = require("./../models/courseModel");
const asyncHandler = require("express-async-handler");

// @access  Private
const getCourses = asyncHandler(async (req, res) => {
  if (req.user.isTeacher) {
    const courses = await Course.find({ user: req.user._id });
    res.json(courses);
  } else {
    const courses = await Course.find();
    res.json(courses);
  }
});

//@description     Fetch single Course
//@route           GET /api/notes/:id
//@access          Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
});

//@description     Create single Course
//@route           GET /api/notes/create
//@access          Private
const CreateCourse = asyncHandler(async (req, res) => {
  const { title, content, category,imageUrl,file } = req.body;
  const titleExists = await Course.findOne({ title });
  if (titleExists) {
    res.status(400);
    throw new Error("title of course already Exists");
  }
  if (!title || !content || !category ) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const course = new Course({ user: req.user._id, title, content, category,imageUrl,file });

    const createdNote = await course.save();

    res.status(201).json(createdNote);
  }
});

//@description     Delete single Course
//@route           GET /api/notes/:id
//@access          Private
const DeleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (course) {
    await course.remove();
    res.json({ message: "Course Removed" });
  } else {
    res.status(404);
    throw new Error("Coursenot Found");
  }
});

// @desc    Update a course
// @route   PUT /api/notes/:id
// @access  Private
const UpdateCourse = asyncHandler(async (req, res) => {
  const { title, content, category,imageUrl,file } = req.body;

  const course = await Course.findById(req.params.id);

  if (course.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (course) {
    course.title = title;
    course.content = content;
    course.category = category;
    course.imageUrl = imageUrl;
    course.file = file;

    const updatedNote = await course.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

module.exports = {
  getCourseById,
  getCourses,
  CreateCourse,
  DeleteCourse,
  UpdateCourse,
};
