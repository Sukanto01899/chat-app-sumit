const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");

// import user model
const User = require("../../model/people");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other then alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be valid bangladeshi number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });

        if (user) {
          throw createError("Mobile already is use");
        }
      } catch (err) {
        createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage("Password must be 8 characters"),
];

function addUserValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    // Remove uploaded file
    if (req.files.length > 0) {
      const { filename } = req.files[0];

      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedError,
    });
  }
}

module.exports = { addUserValidator, addUserValidationHandler };
