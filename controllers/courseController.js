const Course = require("../models/noteModel.js");

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ user: req.user._id });
  res.json(courses);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "course not found" });
  }

  res.json(course);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateCourse = asyncHandler(async (req, res) => {
  const { title, description, date, imageUrl, file } = req.body;

  if (!title || !description || !date || !imageUrl || !file) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const course = new Course({
      user: req.user._id,
      title,
      description,
      date,
      imageUrl,
      file,
    });

    const createdNote = await course.save();

    res.status(201).json(createdNote);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteCourse = asyncHandler(async (req, res) => {
  const course = await Note.findById(req.params.id);

  if (course.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (course) {
    await note.remove();
    res.json({ message: "course Removed" });
  } else {
    res.status(404);
    throw new Error("course not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateCourse = asyncHandler(async (req, res) => {
  const { title, description, date, imageUrl, file } = req.body;

  const course = await Course.findById(req.params.id);

  if (course.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (course) {
    course.title = title;
    course.description = description;
    course.date = date;
    course.imageUrl = imageUrl;
    course.file = file;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

export { getCourseById, getCourses, CreateCourse, DeleteCourse, UpdateCourse };
