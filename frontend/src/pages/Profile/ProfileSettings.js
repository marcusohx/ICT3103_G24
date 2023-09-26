import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function Profile() {
  const { authState } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    firstName: authState?.firstName || "",
    lastName: authState?.lastName || "",
    email: authState?.email || "",
    resumeLink: authState?.resumeLink || "",
    linkedinLink: authState?.linkedinLink || "",
  });

  const [appliedJobs, setAppliedJobs] = useState(authState?.appliedJobs || []);
  const [acceptedJobs, setAcceptedJobs] = useState(
    authState?.acceptedJobs || []
  );
  const [credits, setCredits] = useState(authState?.credits || 0);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    if (authState) {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        firstName: authState.firstName || "",
        lastName: authState.lastName || "",
        email: authState.email || "",
        resumeLink: authState.resumeLink || "",
        linkedinLink: authState.linkedinLink || "",
      }));
      setAppliedJobs(authState.appliedJobs || []);
      setAcceptedJobs(authState.acceptedJobs || []);
      setCredits(authState.credits || 0);
    }
  }, [authState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:3001/user/updateuser", // replace with your API endpoint
        formValues,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Handle success
        console.log("User updated successfully");
      } else {
        // Handle any other HTTP status
        console.log("Error updating user:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (authState) {
    const { email, firstName, lastName } = formValues;

    return (
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "background.paper",
          marginTop: "24px", // Add margin to the top
          marginBottom: "24px", // Add margin to the bottom
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%", // Make the card fill the entire width
              backgroundImage: "linear-gradient(180deg, #a0e7e5, #f8fff4)",
              backgroundSize: "100% 50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src="frontend/src/assets/blank-avatar.jpg"
                sx={{
                  height: 120,
                  width: 120,
                  mb: 2,
                }}
              />
              <Divider sx={{ width: "100%" }} /> {/* Line separator */}
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                sx={{ marginBottom: 1 }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                {email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Credits: {credits}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      helperText="Please specify your first name"
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={formValues.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={formValues.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      required
                      value={formValues.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Resume Link"
                      name="resumeLink"
                      onChange={handleChange}
                      required
                      value={formValues.resumeLink}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Linkedin Link"
                      name="linkedinLink"
                      onChange={handleChange}
                      required
                      value={formValues.linkedinLink}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  padding: 2,
                }}
              >
                <Button variant="contained" type="submit">
                  Save Changes
                </Button>
              </CardActions>
            </form>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Applied Jobs: {appliedJobs.length}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Accepted Jobs: {acceptedJobs.length}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  } else {
    return <div>User is not logged in or data is loading...</div>;
  }
}

export default Profile;
