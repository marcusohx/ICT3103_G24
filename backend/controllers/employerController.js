const Employer = require("../models/Employer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const employer = await Employer.findOne({ email });
  if (!employer) return res.status(404).send("Employer not found");

  const validPassword = await bcrypt.compare(password, employer.password);
  if (!validPassword) return res.status(401).send("Invalid password");

  const token = jwt.sign(
    { employerId: employer._id, email: employer.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000,
    path: "/",
  });

  res.status(200).send("Logged in successfully");
};

exports.register = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const emailExists = await Employer.findOne({ email });
    if (emailExists) return res.status(400).send("Email already registered");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employer = new Employer({
      companyName,
      email,
      password: hashedPassword,
    });

    await employer.save();
    res.status(201).send("Employer created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout successful");
};

exports.getEmployerData = (req, res) => {
  res.status(200).json(req.employer);
};
