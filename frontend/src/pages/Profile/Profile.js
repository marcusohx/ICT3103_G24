import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  Typography,
} from "@mui/material";

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resumeLink: "",
    linkedinLink: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/getuser/${username}`)
      .then((response) => {
        setUserData(response.data);
        const { firstName, lastName, email, resumeLink, linkedinLink } =
          response.data;
        setFormValues({
          firstName,
          lastName,
          email,
          resumeLink,
          linkedinLink,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);

  if (userData) {
    const { email, firstName, lastName, resumeLink, linkedinLink } = formValues;

    return (
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "background.paper",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
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
              <Divider sx={{ width: "100%" }} />
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
                Credits: {userData.credits}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Name:</strong> {formValues.firstName}{" "}
                      {formValues.lastName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Email Address:</strong> {formValues.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Resume Link:</strong>
                      <a
                        href={formValues.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formValues.resumeLink
                          ? " View Resume"
                          : " No Link Provided"}
                      </a>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>LinkedIn Profile:</strong>
                      <a
                        href={formValues.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formValues.linkedinLink
                          ? " View LinkedIn Profile"
                          : " No Link Provided"}
                      </a>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "flex-end",
                padding: 2,
              }}
            ></CardActions>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Applied Jobs: {userData.appliedJobs.length}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Accepted Jobs: {userData.acceptedJobs.length}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  } else {
    return <div>User data is loading...</div>;
  }
}

export default Profile;
