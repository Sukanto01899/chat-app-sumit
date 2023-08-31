const bcrypt = require("bcrypt");
const User = require("../model/people");
const { unlink } = require("fs");
const path = require("path");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}

async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // Remove user avatar
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  } catch (err) {
    res.status(500).json({
      error: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
