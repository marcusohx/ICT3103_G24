const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model
const Employer = require("../models/Employer"); // Adjust the path to your Employer model

module.exports = async (req, res, next) => {
  console.log("Cookies: ", req.cookies);

  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (verified.userId) {
      req.user = await User.findById(verified.userId);
      if (!req.user) {
        return res.status(404).send("User not found");
      }
    } else if (verified.employerId) {
      req.employer = await Employer.findById(verified.employerId);
      if (!req.employer) {
        return res.status(404).send("Employer not found");
      }
    } else {
      return res.status(400).send("Invalid token data");
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid token");
  }
};
