import React, { useState, useContext } from "react";
import axios from "axios";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(EmployerAuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/employer/login", // Update the URL to your employer login endpoint
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        await login({ email, password });
        navigate("/"); // Navigate to the employer dashboard or another appropriate route
      } else {
        setError(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError("No response received from server. Please try again later.");
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Employer Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don’t have an account?&nbsp;
              <Link
                href="/employer-register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}
          <form noValidate onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
}

export default EmployerLogin;
