const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config(); // Ensure this is at the very top of your file
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(email, password, user);
  if (!user) return res.status(404).send("User not found");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send("Invalid password");

  // JWT token generation
  const token = jwt.sign(
    { userId: user._id, email: user.email, userType: user.userType },
    "secret",
    { expiresIn: "1h" }
  );
  console.log(token);
  // Setting the JWT as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
    path: "/", // add this line
  });

  res.status(200).send("Logged in successfully");
};

exports.register = async (req, res) => {
  const { email, username, password, userType } = req.body;

  // Checking if the email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already registered");

  // Checking if the username already exists
  const usernameExists = await User.findOne({ username });
  if (usernameExists) return res.status(400).send("Username already taken");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    username,
    password: hashedPassword,
    userType,
  });

  await user.save();
  res.status(201).send("User created");
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout successful");
};

exports.getUserData = (req, res) => {
  res.status(200).json(req.user);
};
