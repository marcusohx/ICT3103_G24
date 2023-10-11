import React, { useEffect, useState } from "react";
import { api } from 'services/api';
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { response } from "express";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resumeLink: "",
    linkedinLink: "",
    is2FAEnabled: "",
  });

  const [open2FADialog, setOpen2FADialog] = useState(false); // State for the 2FA dialog

  useEffect(() => {
    api
      .get(`user/getuser/${username}`)
      .then((response) => {
        setUserData(response.data);
        const { firstName, lastName, email, resumeLink, linkedinLink, is2FAEnabled } = response.data;
        setFormValues({
          firstName,
          lastName,
          email,
          resumeLink,
          linkedinLink,
          is2FAEnabled,
        });
  
        // Check if 2FA is enabled and initiate 2FA setup if not
        if (!is2FAEnabled) {
          api
            .post('/enable-2fa')
            .then((response) => {
              const { otpAuthURL } = response.data;
              // Use otpAuthURL to display the QR code and instructions for 2FA setup
            })
            .catch((error) => {
              console.error("Error initiating 2FA setup:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);

  if (userData) {
    const { email, firstName, lastName, resumeLink, linkedinLink, is2FAEnabled } = formValues;

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
                <Grid item xs={12}>
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>2FA Enabled: </strong> 
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the default behavior
                          setOpen2FADialog(true); // Open the dialog
                        }}
                      >
                        {formValues.is2FAEnabled
                        ? "View QR Code"
                        : "Click to enable 2FA"}
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
        <Dialog open={open2FADialog} onClose={() => setOpen2FADialog(false)}>
        <DialogTitle>2FA Authentication</DialogTitle>
        <DialogContent>
          {/* Add your 2FA setup content here */}
          {/* You can include QR code, instructions, and an option to enable 2FA */}
          {formValues.is2FAEnabled ? (
          /* If 2FA is enabled, show the QR code */
          <QRCode value={otpAuthURL} />
          //<img src= "{QR code image source}"  alt="QR Code" />
          ) : (
            /* If 2FA is not enabled, show instructions and an option to enable 2FA 
            <div>
              <p>Follow these instructions to enable Two-Factor Authentication:</p>
              <ol>
                <li>Step 1: ...</li>
                <li>Step 2: ...</li>
                <li>Step 3: ...</li>
              </ol>
              <button onClick={() => enable2FA()}>Enable 2FA</button>
            </div>*/
            <div></div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen2FADialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Box>

    );
  } else {
    return <div>User data is loading...</div>;
  }
  
}

export default Profile;
