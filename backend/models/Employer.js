const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 }, // Added credits field with a default value of 0
});

module.exports = mongoose.model("Employer", employerSchema);
