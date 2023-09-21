import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Tooltip,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";
function EmployerJobListings() {
  const [jobListings, setJobListings] = useState([]);
  const { employerAuthState } = useContext(EmployerAuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/joblisting/job-listings/employer/by-employer",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setJobListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
      });
  }, []);

  const handleStatusChange = (jobId, event) => {
    const job = jobListings.find((job) => job._id === jobId);
    if (job.status === "closed") {
      console.error("Cannot change the status of a closed job.");
      return;
    }
    const newStatus = event.target.checked ? "open" : "in-progress";

    axios
      .put(
        `http://localhost:3001/joblisting/job-listings/status/${jobId}`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then((response) => {
        setJobListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === jobId ? { ...listing, status: newStatus } : listing
          )
        );
      })
      .catch((error) => {
        console.error("Error updating job listing status:", error);
      });
  };

  const closeJobAndDistributeCredits = (jobId) => {
    const job = jobListings.find((job) => job._id === jobId);

    // Check if employer has enough credits to distribute to the accepted users
    if (employerAuthState.credits >= job.acceptedUsers.length) {
      axios
        .put(
          `http://localhost:3001/joblisting/job-listings/close/${jobId}`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          setJobListings((prevListings) =>
            prevListings.map((listing) =>
              listing._id === jobId ? { ...listing, status: "closed" } : listing
            )
          );
          // Assuming your response contains the updated employer details
          // Update employer credits in context
          // employerAuthDispatch({ type: 'UPDATE_CREDITS', payload: response.data.credits });
        })
        .catch((error) => {
          console.error("Error closing job and distributing credits:", error);
        });
    } else {
      setSnackbarMessage(
        "Not enough credits to distribute to all accepted users."
      );
      setSnackbarOpen(true);
    }
  };

  if (jobListings.length === 0) {
    return <Typography variant="h6">No job listings found</Typography>;
  }
  if (!employerAuthState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        py: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Divider sx={{ width: "100%", mb: 2 }} />
      {jobListings.map((job) => (
        <Paper
          key={job._id}
          sx={{
            mb: 2,
            p: 2,
            width: "100%",
            maxWidth: 600,
            borderRadius: 2,
            border: "1px solid #000",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip
              title={
                job.status === "open"
                  ? "Open Project"
                  : job.status === "in-progress"
                  ? "In progress Project"
                  : "Closed Project"
              }
            >
              <Switch
                checked={job.status === "open"}
                onChange={(event) => handleStatusChange(job._id, event)}
                disabled={job.status === "closed"} // Disabling switch for closed projects
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Title: {job.title}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Description: {job.description}
            </Typography>
            <Typography variant="body1">Payment: {job.payment}</Typography>
          </Box>

          {job.appliedUsers.length > 0 ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Applied Users:
              </Typography>
              {job.appliedUsers.map((user) => (
                <Typography variant="body2" key={user._id}>
                  - {user.firstName} {user.lastName}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2">No users have applied yet.</Typography>
          )}

          {job.acceptedUsers.length > 0 ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Accepted Users:
              </Typography>
              {job.acceptedUsers.map((user) => (
                <Typography variant="body2" key={user._id}>
                  - {user.firstName} {user.lastName}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2">
              No users have been accepted yet.
            </Typography>
          )}

          {/* Here you would continue with your JSX for skills and buttons */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {job.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{
                    p: "4px 8px",
                    bgcolor: "#f0f0f0",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                to={`/updatejoblisting/${job._id}`}
                style={{ textDecoration: "none", marginRight: "16px" }} // Added marginRight here
              >
                <Button variant="contained" color="secondary">
                  Update
                </Button>
              </Link>
              <Link
                to={`/acceptuser/${job._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Users Applied
                </Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ alignSelf: "flex-end", mt: 2, mb: 1 }}>
            <Button
              variant="contained"
              color="error"
              disabled={job.status === "closed"}
              onClick={() => closeJobAndDistributeCredits(job._id)}
              sx={{ padding: "8px 16px" }}
            >
              Close and Distribute Credits
            </Button>
          </Box>
        </Paper>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EmployerJobListings;
