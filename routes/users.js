const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../modals/User");
const bcrypt = require("bcryptjs");
/// @route      POST api/users
/// @desc       Register a user
/// @access     Public
router.post(
  "/",
  [
    check("name", "Please enter name").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      ///check if user exist
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }
      ///use User modal to create new user instance
      user = new User({
        name,
        email,
        password,
      });

      /// hash the password or encrypt
      const salt = await bcrypt.genSalt(10); //how secure the pswd
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.send("Created successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;
