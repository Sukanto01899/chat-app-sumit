// External import
const express = require("express");

// Internal import
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUploads");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middleware/users/userValidator");

const router = express.Router();

// Get user page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

// delete user
router.delete("/:id", removeUser);

module.exports = router;
