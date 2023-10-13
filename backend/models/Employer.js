const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, required: true }, // Added pin field
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 },
  twoFASecret: { type: String },
  twoFAEnabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("Employer", employerSchema);
