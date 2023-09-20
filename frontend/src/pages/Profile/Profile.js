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
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    console.log("name:", name); // Check the name being updated
    console.log("value:", value); // Check the value being set
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // Add logic to send the form data to the server here
    },
    []
  );

  useEffect(() => {
    console.log("authState:", authState);
    // Fetch user data when the component mounts or when authState changes
    if (authState) {
      axios
        .get("http://localhost:3001/api/user-data")
        .then((response) => {
          // Set userData with the fetched data
          setUserData(response.data);
  
          // Set formValues with the fetched user data
          const { firstName, lastName, email } = response.data;
          setFormValues({ firstName, lastName, email });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [authState]);
  
  if (authState && userData) {
    const { email, firstName, lastName } = formValues;

    console.log("first:", formValues.firstName);
    console.log("last:", formValues.lastName);

    return (
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src="frontend/src/assets/blank-avatar.jpg"
                      sx={{
                        height: 80,
                        mb: 2,
                        width: 80,
                      }}
                    />
                    <Typography gutterBottom variant="h5">
                      {firstName} {lastName}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Card>
                  <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            helperText="Please specify the first name"
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
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained" type="submit">
                      Save details
                    </Button>
                  </CardActions>
                </Card>
              </form>
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
