const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses.controller");
const { body } = require("express-validator");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require('../middlewares/verifyToken')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middlewares/allowedTo')

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(verifyToken,allowedTo(userRoles.MANAGER),validationSchema(), courseController.addCourse);

router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(
    [
      body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2 })
        .withMessage("Title must be at  least 2 char"),
      body("price").notEmpty().withMessage("Price is required"),
    ],
    courseController.updateCourse,
  )
  .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),courseController.deleteCourse);

module.exports = router;
