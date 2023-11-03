import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "services/api";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";
import {
  Container,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

function AcceptUser() {
  const { jobId } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { employerAuthState } = useContext(EmployerAuthContext);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Use axios to get job listing details
    api
      .get(`joblisting/job-listings/${jobId}`)
      .then((response) => {
        setUsers(response.data.appliedUsers);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  }, [jobId]);

  const handleAcceptUser = () => {
    // Use axios to accept a user for a job listing
    api
      .put(
        `joblisting/job-listings/${jobId}/accept-user/${selectedUser}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNotification({
          open: true,
          message: "User accepted for the job",
          severity: "success",
        });
      })
      .catch((error) => {
        console.error(
          "There was an error accepting the user for the job!",
          error
        );
        setNotification({
          open: true,
          message: "There was an error accepting the user for the job!",
          severity: "error",
        });
      });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  if (!employerAuthState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Accept User for Job
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="user-select-label">Select a user</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Select a user"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAcceptUser}>
        Accept User
      </Button>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AcceptUser;
