const Employer = require("../models/Employer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const employer = await Employer.findOne({ email });
  if (!employer) return res.status(401).send("Invalid Username/Password");

  const validPassword = await bcrypt.compare(password, employer.password);
  if (!validPassword) return res.status(401).send("Invalid Username/Password");

  // Check if 2FA is enabled for the user
  if (employer.twoFAEnabled) {
    // Generate a temporary authentication token
    const tempAuthToken = crypto.randomBytes(32).toString("hex");

    // Optionally, store the temporary auth token in the database associated with the user
    // This step is recommended to allow for token verification later
    employer.tempAuthToken = tempAuthToken;
    await employer.save();

    return res
      .status(206)
      .send({ tempAuthToken, message: "2FA verification required" }); // 206 Partial Content
  }

  const token = jwt.sign(
    { employerId: employer._id, email: employer.email },
    process.env.JWT_SECRET,
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
  const { companyName, email, password, pin } = req.body;

  try {
    const emailExists = await Employer.findOne({ email });
    if (emailExists) {
      return res.status(400).send("Email already registered");
    } else {
      // Validate if email is of an actual email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid input.");
      }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Invalid input.");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPin = await bcrypt.hash(pin, salt); // Hashing the pin
    // Generate a temporary authentication token
    const tempAuthToken = crypto.randomBytes(32).toString("hex");

    const employer = new Employer({
      companyName,
      email,
      password: hashedPassword,
      pin: hashedPin, // Storing the hashed pin
      tempAuthToken,
    });

    await employer.save();
    res.status(201).send("Employer created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.getEmployerByCompanyName = async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const employer = await Employer.findOne({
      companyName: companyName,
    }).select("-password -pin"); // Exclude the password field

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json(employer);
  } catch (error) {
    console.error("Error fetching employer data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEmployer = async (req, res) => {
  try {
    const { email, companyName } = req.body; // and any other fields you want to update
    const employerId = req.employer._id; // Assuming the employerId is stored in the request object from middleware

    if (!employerId) {
      return res.status(400).send("Employer ID is required");
    }

    const employer = await Employer.findById(employerId);

    if (!employer) {
      return res.status(404).send("Employer not found");
    }

    // Update the fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
      if (emailRegex.test(email)) {
        employer.email = email;
      } else {
        throw new Error("Invalid Email");
      }
    }
    
    if (companyName) employer.companyName = companyName;

    await employer.save();

    res.status(200).send("Employer updated successfully");
  } catch (error) {
    console.error("Error updating employer:", error);
    res.status(500).send("Something went wrong");
  }
};

exports.verifyPin = async (req, res) => {
  const { pin } = req.body;
  const employerId = req.employer._id; // Assuming the employerId is stored in the request object from middleware or JWT

  if (!pin) {
    return res.status(400).json({ success: false, message: "PIN is required" });
  }

  if (!employerId) {
    return res
      .status(400)
      .json({ success: false, message: "Employer ID is required" });
  }

  try {
    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    const validPin = await bcrypt.compare(pin, employer.pin); // Compare entered PIN with stored hashed PIN

    if (validPin) {
      res
        .status(200)
        .json({ success: true, message: "PIN verified successfully" });
    } else {
      res.status(401).json({ success: false, message: "Invalid PIN" });
    }
  } catch (error) {
    console.error("Error verifying PIN:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout successful");
};

exports.getEmployerData = (req, res) => {
  res.status(200).json(req.employer);
};
