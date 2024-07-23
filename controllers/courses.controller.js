const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return res.status(404).json({ error: "Course Not Found!" });
  }
  res.json(course);
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);

  const newCourse = new Course(req.body);
  await newCourse.save();
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.status(201).json(newCourse);
};
const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $set: { ...req.body },
    });
    return res.json(updatedCourse);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
const deleteCourse = async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ message: "Course deleted successfully!" });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
