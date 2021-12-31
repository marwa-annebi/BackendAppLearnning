import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    imageUrl: { type: String, required: true },
    file: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Note", courseSchema);

export default Course;
