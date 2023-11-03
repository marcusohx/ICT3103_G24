const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, required: true }, // Added pin field
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 },
  linkedinLink: { type: String, default: "" },
  twoFASecret: { type: String, default: "" },
  twoFAEnabled: { type: Boolean, default: false },
  tempAuthToken: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
