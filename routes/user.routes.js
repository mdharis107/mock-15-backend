const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

const userController = Router();

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    res.send("User already exists,Please login");
  }

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send("Something went wrong again, Please try again");
    }

    const user = new UserModel({
      name,
      email,
      password: hash,
    });
    try {
      await user.save();
      res.send({ msg: "Signup Successful" });
    } catch (err) {
      console.log(err);
      res.send("Something went wrong, Please try again");
    }
  });
});

userController.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("Something went wrong, Please try again");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY);
      res.send({ msg: "Login Successful", token });
    } else {
      res.send("Invalid credentials Please Signup if you haven't");
    }
  });
});

module.exports = {
  userController,
};
