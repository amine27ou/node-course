const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at  least 2 char"),
    body("price").notEmpty().withMessage("Price is required"),
  ];
};
module.exports = {
  validationSchema,
};
