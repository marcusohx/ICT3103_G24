const express = require("express");
const jobListingController = require("../controllers/jobListingController");
const authMiddleware = require("../middlewares/auth"); // Adjust the path to your controller file
const router = express.Router();

router.get("/job-listings", jobListingController.getJobListings);
router.get("/job-listings/:id", jobListingController.getJobListingById);
router.post("/createjoblisting", jobListingController.createJobListing);
router.post(
  "/job-listings/apply/:jobId",
  authMiddleware,
  jobListingController.applyForJob
);
// Added new route for applying for a job

module.exports = router;
