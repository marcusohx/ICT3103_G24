import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Tooltip,
  Switch,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";
function EmployerJobListings() {
  const [jobListings, setJobListings] = useState([]);
  const { employerAuthState } = useContext(EmployerAuthContext);
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
                to={`/acceptuser/${job._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Users Applied
                </Button>
              </Link>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default EmployerJobListings;
