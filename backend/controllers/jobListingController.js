const JobListing = require("../models/JobListing"); // Adjust the path to your JobListing model file

// Route to get all job listings
exports.getJobListings = async (req, res) => {
  try {
    const jobListings = await JobListing.find()
      .populate("employer", "companyName")
      .populate("appliedUsers", "firstName lastName")
      .populate("acceptedUsers", "firstName lastName");
    res.json(jobListings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Route to get details of a single job listing
exports.getJobListingById = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id)
      .populate("employer", "companyName")
      .populate("appliedUsers", "firstName lastName")
      .populate("acceptedUsers", "firstName lastName");
    if (!jobListing) {
      return res.status(404).send("Job listing not found");
    }
    res.json(jobListing);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Job listing not found");
    }
    res.status(500).send("Server error");
  }
};

exports.createJobListing = async (req, res) => {
  try {
    const newJobListing = new JobListing(req.body);
    console.log(req.body);
    const jobListing = await newJobListing.save();
    res.json(jobListing);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
