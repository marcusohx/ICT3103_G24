const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 }, // Added credits field with a default value of 0
});

module.exports = mongoose.model("User", userSchema);
