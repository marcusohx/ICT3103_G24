const express = require("express");
const jobListingController = require("../controllers/jobListingController"); // Adjust the path to your controller file
const router = express.Router();

router.get("/job-listings", jobListingController.getJobListings);
router.get("/job-listings/:id", jobListingController.getJobListingById);
router.post("/createjoblisting", jobListingController.createJobListing);

module.exports = router;
