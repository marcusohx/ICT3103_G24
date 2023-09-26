import React from "react";
import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";

function ChooseRole() {
  return (
      <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2rem",
      padding: "2rem",
      minHeight: "100vh",
      background: "#fff", // Modern white background
    }}
  >
    {/* Logo */}
    <Box sx={{ marginBottom: "2rem" }}>
      <img
        src="\frontend\src\assets\SITGigs-Logo.png" // Replace with the actual path to your logo image
        style={{ maxWidth: "100%" }} // Ensure the logo fits within the container
      />
    </Box>

    <Box
      sx={{
        maxWidth: 500,
        width: "100%",
        p: 4,
        backgroundColor: "#fff",
        textAlign: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" color="primary">
        Welcome!
      </Typography>
      <Stack spacing={3} sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h6">Sign In as</Typography>
      </Stack>
      <Button
        fullWidth
        size="large"
        sx={{
          backgroundColor: "#2196F3",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1976D2",
          },
        }}
        variant="contained"
        component={Link}
        href="/userlogin"
      >
        Student
      </Button>
      <Divider sx={{ my: 2 }} /> {/* Straight line separator */}
      <Button
        fullWidth
        size="large"
        sx={{
          backgroundColor: "#FF5722",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#E64A19",
          },
        }}
        variant="contained"
        component={Link}
        href="/employerlogin"
      >
        Employer
      </Button>
    </Box>
  </Box>

  );
}

export default ChooseRole;
