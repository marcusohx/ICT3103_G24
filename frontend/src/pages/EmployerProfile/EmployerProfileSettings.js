import React, { useContext, useEffect, useState, useCallback } from "react";
import { api } from "services/api";
import { EmployerAuthContext } from "../../contexts/EmployerAuthContext";
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

function EmployerProfile() {
  const { employerAuthState } = useContext(EmployerAuthContext);
  const [formValues, setFormValues] = useState({
    companyName: employerAuthState?.companyName || "",
    email: employerAuthState?.email || "",
  });

  const [postedJobs, setPostedJobs] = useState(
    employerAuthState?.postedJobs || []
  );
  const [twoFAEnabled, setTwoFAEnabled] = useState(
    employerAuthState?.twoFAEnabled || false
  );
  const [message, setMessage] = useState(""); // Define the 'setMessage' function
  const [twoFAMessage, setTwoFAMessage] = useState("");
  const handleTwoFAClose = () => {
    setOpenTwoFADialog(false);
  };
  const updateTwoFAMessage = (message) => {
    setTwoFAMessage(message);
    if (message === "2FA verified successfully"){
      setSnackbarType("success");
      setOpenSnackbar(true);
    }
    else{
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");

  const [openTwoFADialog, setOpenTwoFADialog] = useState(false); // State to control dialog visibility

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  async function disable2FA() {
    try {
      // Make an API request to disable 2FA
      const response = await api.post(
        "twofa/disable2fa",
        {},
        {
          withCredentials: true,
        }
      );
      const data = response.data;
  
      if (data === "2FA Disabled") {
        // Show a success message popup
        setTwoFAMessage("2FA Disabled successfully");
        setSnackbarType("success");
        setOpenSnackbar(true);
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
        // Update the state to reflect 2FA disabled
        setTwoFAEnabled(false);
      } else {
        // Show an error message popup
        setMessage("2FA disabling failed");
        setSnackbarType("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      setMessage("Error disabling 2FA");
      setSnackbarType("success");
      setOpenSnackbar(true);
    }
  }
  

  useEffect(() => {
    if (employerAuthState) {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        companyName: employerAuthState.companyName || "",
        email: employerAuthState.email || "",
        twoFAEnabled: employerAuthState.twoFAEnabled || false,
      }));
      setPostedJobs(employerAuthState.postedJobs || []);
    }
  }, [employerAuthState]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.put("employer/updateemployer", formValues, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setSnackbarType("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarType("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };

  if (employerAuthState) {
    const { email, companyName, twoFAEnabled } = formValues;

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
                src="/path-to-your-employer-avatar-image.jpg"
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
                {companyName}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                {email}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify your company name"
                      label="Company Name"
                      name="companyName"
                      onChange={handleChange}
                      required
                      value={formValues.companyName}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                onClick={() => {
                  if (twoFAEnabled){
                    disable2FA();
                  } 
                  else {
                    setOpenTwoFADialog(true);
                  }
                  
                }}
              >
                {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </Button>
            </CardContent>
          </Card>
          <Dialog
            open={openTwoFADialog}
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
              <TwoFASetup 
                open={openTwoFADialog} // Pass open state to TwoFASetup
                onClose={handleTwoFAClose}
                updateTwoFAMessage={updateTwoFAMessage} // Pass the callback function
              />
            </DialogContent>
          </Dialog>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Posted Jobs: {postedJobs.length}
              </Typography>
            </CardContent>
          </Card>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
            {snackbarType === "success"
              ? twoFAMessage || "Employer updated successfully!"
              : "Error updating employer."}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return <div>Employer is not logged in or data is loading...</div>;
  }
}

export default EmployerProfile;