import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
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
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function EmployerProfile() {
  const { employerAuthState } = useContext(EmployerAuthContext);
  const [formValues, setFormValues] = useState({
    companyName: employerAuthState?.companyName || "",
    email: employerAuthState?.email || "",
  });

  const [postedJobs, setPostedJobs] = useState(
    employerAuthState?.postedJobs || []
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    if (employerAuthState) {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        companyName: employerAuthState.companyName || "",
        email: employerAuthState.email || "",
      }));
      setPostedJobs(employerAuthState.postedJobs || []);
    }
  }, [employerAuthState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:3001/employer/updateemployer",
        formValues,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSnackbarType("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarType("error");
        setOpenSnackbar(true);
        console.log("Error updating employer:", response.data);
      }
    } catch (error) {
      setSnackbarType("error");
      setOpenSnackbar(true);
      console.error("Error updating employer:", error);
    }
  };

  if (employerAuthState) {
    const { email, companyName } = formValues;

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
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
            {snackbarType === "success"
              ? "Employer updated successfully!"
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
