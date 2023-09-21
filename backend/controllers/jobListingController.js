const JobListing = require("../models/JobListing"); // Adjust the path to your JobListing model file

exports.getJobListings = async (req, res) => {
  try {
    const { status } = req.query;

    // Validate the status query parameter
    if (status && !["open", "closed"].includes(status)) {
      return res.status(400).send("Invalid status value");
    }

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const jobListings = await JobListing.find(filter)
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateJobListingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate the status body parameter
    if (!status || !["open", "in-progress", "closed"].includes(status)) {
      return res.status(400).send("Invalid status value");
    }

    const jobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

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

exports.updateJobListing = async (req, res) => {
  try {
    const updatedJobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJobListing) {
      return res.status(404).send("Job listing not found");
    }

    res.json(updatedJobListing);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Job listing not found");
    }
    res.status(500).send("Server error");
  }
};

exports.closeJobListingAndGiveCredits = async (req, res) => {
  try {
    const job = await JobListing.findById(req.params.jobId)
      .populate("employer")
      .populate("acceptedUsers");

    if (!job) return res.status(404).send("Job not found");

    // ... (ensure the job can be closed, the employer has enough credits, etc.)

    job.status = "closed";

    const creditPerUser = job.payment / job.acceptedUsers.length;

    job.employer.credits -= job.payment; // Adjust the employer's credits

    job.acceptedUsers.forEach((user) => {
      console.log(user);
      user.credits += creditPerUser; // Adjust each applied user's credits
      user.save();
    });

    await job.save();
    await job.employer.save();

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
