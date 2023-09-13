import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { EmployerAuthContext } from "../../contexts/EmployerAuthContext";

function JobListingsPage() {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { authState } = useContext(AuthContext);
  const { employerauthState } = useContext(EmployerAuthContext);

  useEffect(() => {
    // Replace with your API endpoint to get all job listings

    axios
      .get("http://localhost:3001/joblisting/job-listings")
      .then((response) => {
        setJobListings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job listings!", error);
      });
  }, []);

  const viewDetails = (job) => {
    // Replace with your API endpoint to get job details
    axios
      .get(`http://localhost:3001/joblisting/job-listings/${job._id}`)
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  };
  if (!authState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
  return (
    <Container>
      <h1>Job Listings</h1>
      {selectedJob ? (
        <div>
          <h1>{selectedJob.title}</h1>
          <p>{selectedJob.description}</p>
          <p>Payment: ${selectedJob.payment}</p>
          <Button variant="contained" onClick={() => setSelectedJob(null)}>
            Back
          </Button>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobListings.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>${job.payment}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => viewDetails(job)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default JobListingsPage;
