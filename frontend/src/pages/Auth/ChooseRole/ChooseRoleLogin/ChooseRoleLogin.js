import React from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";

function ChooseRole() {
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "2rem",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          width: "100%",
          px: 3,
          py: "100px",
          backgroundColor: "#f9f9f9", // Add your preferred background color
          textAlign: "center",
          border: "1px solid #ccc", // Add your preferred border color
          borderRadius: "8px", // Optional: for rounded corners
          margin: "auto", // Center the box
        }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4">User</Typography>
          <Typography color="text.secondary" variant="body2">
            Login or register as a user
          </Typography>
        </Stack>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
          component={Link}
          href="/userlogin"
        >
          Login
        </Button>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
          component={Link}
          href="/userregister"
        >
          Register
        </Button>
      </Box>

      <Box
        sx={{
          maxWidth: 550,
          width: "100%",
          px: 3,
          py: "100px",
          backgroundColor: "#f9f9f9", // Add your preferred background color
          textAlign: "center",
          border: "1px solid #ccc", // Add your preferred border color
          borderRadius: "8px", // Optional: for rounded corners
          margin: "auto", // Center the box
        }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4">Employer</Typography>
          <Typography color="text.secondary" variant="body2">
            Login or register as an employer
          </Typography>
        </Stack>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
          component={Link}
          href="/employerlogin"
        >
          Login
        </Button>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
          component={Link}
          href="/employerregister"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default ChooseRole;
