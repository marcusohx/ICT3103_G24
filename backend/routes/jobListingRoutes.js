const express = require("express");
const jobListingController = require("../controllers/jobListingController");
const authMiddleware = require("../middlewares/auth"); // Adjust the path to your controller file
const router = express.Router();

// Added new route for getting all job listings
router.get("/job-listings", jobListingController.getJobListings);

// Added new route for getting a single job listing
router.get("/job-listings/:id", jobListingController.getJobListingById);

// Added new route for creating a job listing
router.post(
  "/createjoblisting",
  authMiddleware,
  jobListingController.createJobListing
);

// Added new route for applying for a job
router.post(
  "/job-listings/apply/:jobId",
  authMiddleware,
  jobListingController.applyForJob
);
// Added new route for accepting user for a job
router.put(
  "/job-listings/:jobId/accept-user/:userId",
  authMiddleware,
  jobListingController.acceptUserForJob
);
// Added new route to get job listings by employer
router.get(
  "/job-listings/employer/by-employer",
  authMiddleware,
  jobListingController.getJobListingsByEmployer
);

module.exports = router;
