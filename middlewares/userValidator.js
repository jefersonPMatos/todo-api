const { check } = require("express-validator");

const userValidator = [
  check("email").notEmpty().isEmail().withMessage("Revise o campo e-mail"), 
  check("password").notEmpty().isLength({ min: 6 }).withMessage("Revise o campo password"), 
];

module.exports = userValidator;
