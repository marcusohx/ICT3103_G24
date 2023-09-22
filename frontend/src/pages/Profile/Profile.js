import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function Profile() {
  const { authState } = useContext(AuthContext);
  const [userData, setUserData] = useState(authState || null);
  const [formValues, setFormValues] = useState({
    firstName: authState?.firstName || "",
    lastName: authState?.lastName || "",
    email: authState?.email || "",
  });

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [credits, setCredits] = useState(0);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    if (authState) {
      axios
        .get("http://localhost:3001/api/user-data")
        .then((response) => {
          setUserData(response.data);
          const { firstName, lastName, email } = response.data;
          setFormValues({ firstName, lastName, email });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Simulate fetching applied jobs, accepted jobs, and credits
      setTimeout(() => {
        setAppliedJobs([/* ... */]);
        setAcceptedJobs([/* ... */]);
        setCredits(500);
      }, 1000);
    }
  }, [authState]);

  if (authState && userData) {
    const { email, firstName, lastName } = formValues;

    return (
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Card
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
          <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              src="frontend/src/assets/blank-avatar.jpg"
              sx={{
                height: 120,
                width: 120,
                mb: 2,
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              sx={{ marginBottom: 1 }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Credits: {credits}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
      <Card>
          <CardHeader title="General Info" />
          <CardContent>
            <Box sx={{ mt: -2 }}>
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
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ mt: 3 }}>
          <CardHeader title="Jobs" />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Applied Jobs: {appliedJobs.length}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Accepted Jobs: {acceptedJobs.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Box>


    );
  } else {
    return <div>User is not logged in or data is loading...</div>;
  }
}

export default Profile;
