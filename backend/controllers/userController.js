const User = require("../models/User");
const bcrypt = require("bcrypt");

require("dotenv").config(); // Ensure this is at the very top of your file
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const axios = require("axios");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("Invalid username/password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send("Invalid username/password");

  // Check if 2FA is enabled for the user
  if (user.twoFAEnabled) {
    const tempAuthToken = crypto.randomBytes(32).toString("hex");

    user.tempAuthToken = tempAuthToken;
    await user.save();
    return res
      .status(206)
      .send({ tempAuthToken, message: "2FA verification required" }); // 206 Partial Content
  }
  // JWT token generation
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
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

exports.getUserByName = async (req, res) => {
  try {
    // Get the username from the request parameters
    const { username } = req.params;

    // Fetch the user from the database using the provided username and exclude password and _id fields
    const user = await User.findOne({ username }).select("-password -_id");

    // If user doesn't exist, return a 404 Not Found response
    if (!user) return res.status(404).send("User not found");

    // If the user exists, send their data back as a response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.register = async (req, res) => {
  const { email, username, password, firstName, lastName, pin } = req.body;
  console.log(req.body);
  try {
    // Checking if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send("Email already registered");
    } else {
      // Validate if email is of an actual email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid input.");
      }
    }

    // Checking if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).send("Username already taken");
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Invalid input.");
    }

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPin = await bcrypt.hash(pin, salt); // Hashing the pin
    //tempAuthToken is used for 2FA
    const tempAuthToken = crypto.randomBytes(32).toString("hex");
    // Create a new user
    const user = new User({
      email,
      username,
      pin: hashedPin, // Storing the hashed pin
      password: hashedPassword,
      firstName,
      lastName,
      tempAuthToken,
    });

    // Save the new user in the database
    await user.save();

    // Respond with a success message
    res.status(201).send("User created");
  } catch (error) {
    // Respond with a generic error message
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Obtain the user ID from the JWT passed in the request (assuming you have some middleware
    // that decodes the JWT and puts the user object in the req)
    const userId = req.user._id;

    // Extract updatable fields from the request body
    const { email, username, firstName, lastName, linkedinLink } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the user fields if they are provided

    // Regular Expression Patterns to validate user input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;

    if (email) {
      if (emailRegex.test(email)) {
        user.email = email;
      } else {
        throw new Error("Invalid Email");
      }
    }
    if (username) user.username = username;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (linkedinLink) {
      if (linkedinRegex.test(linkedinLink)) {
        user.linkedinLink = linkedinLink;
      } else {
        throw new Error("Invalid linkedin URL");
      }
    }

    // Save the updated user to the database
    await user.save();

    // Send a success response
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating user");
  }
};

exports.recaptcha = async (req, res) => {
  const { token } = req.body;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    res.status(500).json({ success: false });
  }
};

exports.verifyPin = async (req, res) => {
  const { pin } = req.body;
  const userId = req.user._id; // Assuming the userId is stored in the request object from middleware or JWT

  try {
    if (!pin) {
      return res
        .status(400)
        .json({ success: false, message: "PIN is required" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPin = await bcrypt.compare(pin, user.pin); // Compare entered PIN with stored hashed PIN

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

exports.getUserData = (req, res) => {
  res.status(200).json(req.user);
};
