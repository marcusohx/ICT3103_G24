import React, { useState, useContext, useEffect } from "react";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
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
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Title: {job.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Description: {job.description}
            </Typography>
            <Typography variant="body1">Payment: {job.payment}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
        </Paper>
      ))}
    </Box>
  );
}

export default EmployerJobListings;
