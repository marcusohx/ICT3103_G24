import React, { useContext, useEffect, useState, useCallback } from "react";
import { api } from "services/api";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TwoFASetup from "../Auth/2FA/TwoFA"; // Import the TwoFASetup component

function Profile() {
  const { authState } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    firstName: authState?.firstName || "",
    lastName: authState?.lastName || "",
    email: authState?.email || "",
    linkedinLink: authState?.linkedinLink || "",
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(
    authState?.twoFAEnabled || false
  );

  const [appliedJobs, setAppliedJobs] = useState(authState?.appliedJobs || []);
  const [acceptedJobs, setAcceptedJobs] = useState(
    authState?.acceptedJobs || []
  );
  const [credits, setCredits] = useState(authState?.credits || 0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success"); // can be 'success' or 'error'
  const [errorMsg, setErrorMsg] = useState(""); // Use to display error message in snack bar
  const [openTwoFADialog, setOpenTwoFADialog] = useState(false); // State to control dialog visibility

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  // useEffect(() => {
  //   // Assuming the API endpoint is http://localhost:3001/user/getJobs/${username}
  //   axios
  //     .get(`http://localhost:3001/user/getJobs/${username}`)
  //     .then((response) => {
  //       const { appliedJobs, acceptedJobs } = response.data;
  //       setAppliedJobs(appliedJobs || []);
  //       setAcceptedJobs(acceptedJobs || []);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching jobs:", error);
  //       // Optionally set default empty arrays if the fetch fails
  //       setAppliedJobs([]);
  //       setAcceptedJobs([]);
  //     });
  // }, [username]);

  //const redirectToTwoFA = () => {
  //navigate("/two-fa-setup"); // replace '/two-fa-setup' with the path of your new page
  //};

  useEffect(() => {
    if (authState) {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        firstName: authState.firstName || "",
        lastName: authState.lastName || "",
        email: authState.email || "",
        linkedinLink: authState.linkedinLink || "",
      }));

      // Now fetch the applied and accepted jobs using authState.username
      api
        .get(`user/getuser/${authState.username}`)
        .then((response) => {
          const { appliedJobs, acceptedJobs, credits, twoFAEnabled } =
            response.data;
          setAppliedJobs(appliedJobs || []);
          setAcceptedJobs(acceptedJobs || []);
          setCredits(credits || 0);
          setTwoFAEnabled(twoFAEnabled);
        })
        .catch((error) => {
          console.error("There was an error fetching jobs:", error);
          // Optionally set default empty arrays if the fetch fails
          setAppliedJobs([]);
          setAcceptedJobs([]);
        });
    }
  }, [authState]); // Dependency array includes `authState` as both state setting and fetching jobs depends on it

  const validateLinkedIn = useCallback((url) => {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;
    return linkedinRegex.test(url);
  }, []);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(formValues.email)) {
      setSnackbarType("error");
      setErrorMsg("Invalid Email input.");
      setOpenSnackbar(true);
      return; // Exit early if email is invalid
    }

    if (!validateLinkedIn(formValues.linkedinLink)) {
      setSnackbarType("error");
      setErrorMsg("Invalid Linkedin URL.");
      setOpenSnackbar(true);
      return; // Exit early if LinkedIn URL is invalid
    }

    try {
      const response = await api.put("user/updateuser", formValues, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setSnackbarType("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarType("error");
        setErrorMsg(response.data);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarType("error");
      setErrorMsg(error);
      setOpenSnackbar(true);
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
                      inputProps={{ maxLength: 8 }} // Limit input to 8 characters
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
                      inputProps={{ maxLength: 8 }} // Limit input to 8 characters
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
              <Button
                variant="contained"
                color="primary"
                //onClick={redirectToTwoFA}
                onClick={() => setOpenTwoFADialog(true)}
              >
                {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </Button>
            </CardContent>
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
          <Dialog
            open={openTwoFADialog}
            //onClose={() => setOpenTwoFADialog(false)}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenTwoFADialog(false)}
              aria-label="close"
              style={{
                position: "absolute",
                top: "0px",
                right: "8px",
                color: "red",
                fontSize: "1rem",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle>Two-Factor Authentication Setup</DialogTitle>
            <DialogContent>
              <TwoFASetup onClose={() => setOpenTwoFADialog(false)} />
            </DialogContent>
          </Dialog>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
            {snackbarType === "success"
              ? "User updated successfully!"
              : errorMsg || "Error updating user."}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return <div>User is not logged in or data is loading...</div>;
  }
}

export default Profile;
