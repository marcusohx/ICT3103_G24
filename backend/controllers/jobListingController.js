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

exports.applyForJob = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.jobId);
    if (!jobListing) {
      return res.status(404).send("Job listing not found");
    }

    // Get the id of the authenticated user or employer
    const authenticatedId = req.user
      ? req.user._id
      : req.employer
      ? req.employer._id
      : null;
    if (!authenticatedId) {
      console.log(jobListing);
      return res.status(401).send("Not authenticated");
    }
    // Check if user or employer has already applied
    if (
      jobListing.appliedUsers.some(
        (userId) => userId.toString() === authenticatedId.toString()
      )
    ) {
      return res.status(400).send("User has already applied for this job");
    }
    jobListing.appliedUsers.push(authenticatedId);
    await jobListing.save();
    res.json({ msg: "Job application successful" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Job listing not found");
    }
    res.status(500).send("Server error");
  }
};

exports.acceptUserForJob = async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.jobId);
    if (!jobListing) {
      return res.status(404).send("Job listing not found");
    }

    const userId = req.params.userId;

    // Remove user from appliedUsers array
    jobListing.appliedUsers.pull({ _id: userId });

    // Add user to acceptedUsers array
    jobListing.acceptedUsers.push(userId);

    await jobListing.save();

    res.json({ msg: "User accepted for the job" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Job listing or user not found");
    }
    res.status(500).send("Server error");
  }
};
exports.getJobListingsByEmployer = async (req, res) => {
  try {
    const employerId = req.employer._id; // Assuming you have a middleware that sets req.user to the authenticated user

    const jobListings = await JobListing.find({ employer: employerId })
      .populate("employer", "companyName") // Adjust fields as necessary
      .populate("appliedUsers", "firstName lastName") // Adjust fields as necessary
      .populate("acceptedUsers", "firstName lastName"); // Adjust fields as necessary
    res.json(jobListings);
    console.log(jobListings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
