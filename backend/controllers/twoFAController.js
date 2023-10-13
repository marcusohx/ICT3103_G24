// controllers/twoFAController.js
const speakeasy = require("speakeasy");
const { toDataURL } = require("qrcode");
const User = require("../models/User");
const Employer = require("../models/Employer");

require("dotenv").config(); // Ensure this is at the very top of your file
const jwt = require("jsonwebtoken");

exports.generateSecret = async (req, res) => {
  try {
    let userOrEmployer;
    if (req.user) {
      userOrEmployer = await User.findById(req.user._id);
    } else if (req.employer) {
      userOrEmployer = await Employer.findById(req.employer._id);
    } else {
      return res.status(400).send("User ID or Employer ID not provided");
    }

    if (!userOrEmployer) {
      return res.status(404).send("User or Employer not found");
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    const dataURL = await toDataURL(secret.otpauth_url);

    userOrEmployer.twoFASecret = secret.base32;
    await userOrEmployer.save();

    res.json({ secret: secret.base32, dataURL }); // send secret and dataURL to client
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.verifyToken = async (req, res) => {
  try {
    let userOrEmployer;
    if (req.user) {
      userOrEmployer = await User.findById(req.user._id);
      if (!userOrEmployer) {
        return res.status(404).send("User not found");
      }
    } else if (req.employer) {
      userOrEmployer = await Employer.findById(req.employer._id);
      if (!userOrEmployer) {
        return res.status(404).send("Employer not found");
      }
    } else {
      return res.status(400).send("User or Employer ID not provided");
    }

    const token = req.body.token;
    if (!token) {
      return res.status(400).send("Token not provided");
    }

    const verified = speakeasy.totp.verify({
      secret: userOrEmployer.twoFASecret,
      encoding: "base32",
      token: token,
    });

    if (verified) {
      userOrEmployer.twoFAEnabled = true;
      await userOrEmployer.save();
      res.status(200).send("Verified");
    } else {
      res.status(400).send("Verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
exports.verify2FAAndLogin = async (req, res) => {
  try {
    const { email, token } = req.body;
    if (!email) {
      return res.status(400).send("Email not provided");
    }

    let userOrEmployer;
    let isUser = false;

    // First, try to find a User with the provided email
    userOrEmployer = await User.findOne({ email });
    if (userOrEmployer) {
      isUser = true; // Set flag to indicate we found a User
    } else {
      // If no User is found, try to find an Employer with the provided email
      userOrEmployer = await Employer.findOne({ email });
    }

    // If no User or Employer is found, send a 404 response
    if (!userOrEmployer) {
      return res.status(404).send("User or Employer not found");
    }

    if (!token) {
      return res.status(400).send("Token not provided");
    }

    const verified = speakeasy.totp.verify({
      secret: userOrEmployer.twoFASecret,
      encoding: "base32",
      token: token,
    });

    if (verified) {
      // JWT token generation
      const tokenPayload = isUser
        ? { userId: userOrEmployer._id, email: userOrEmployer.email }
        : { employerId: userOrEmployer._id, email: userOrEmployer.email };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Setting the JWT as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
        path: "/",
      });

      res.status(200).send("Verified and logged in successfully");
    } else {
      res.status(400).send("Verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
