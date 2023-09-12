import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom"; // Import useHistory
import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold error messages

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Ensure credentials are included
        }
      );

      // Check the response status and data to determine the outcome of the login attempt
      if (response.status === 200) {
        await login({ email, password });
        navigate("/"); // If status is 200, login was successful, navigate to home
      } else {
        setError(response.data); // If status is not 200, set the error message based on the response data
      }
    } catch (error) {
      // Handle errors that occur during the Axios request (network errors, server errors, etc.)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data); // Display the server's response message
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
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
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              {" "}
              Don&apos;t have an account? &nbsp;
              <Link href="/register" underline="hover" variant="subtitle2">
                Register{" "}
              </Link>
            </Typography>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* Display error message if there is an error */}
          <form noValidate onSubmit={handleLogin}>
            {" "}
            {/* Add onSubmit handler to the form */}
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

export default Login;
