const mongoose = require("mongoose");

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  acceptedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("JobListing", jobListingSchema);
