const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Added username field
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 },
  resumeLink: { type: String, default: "" }, // Added resumeLink field with a default value of empty string
  linkedinLink: { type: String, default: "" }, // Added linkedinLink field with a default value of empty string
  totpSecret: { type: String },
  is2FAEnabled: { type: Boolean, default: false},
});

module.exports = mongoose.model("User", userSchema);
