const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
});

module.exports = mongoose.model("Employer", employerSchema);
