import React, { useState, useContext } from "react";
import { api } from 'services/api';
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "user/login",
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
        navigate("/");
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
        backgroundColor: "#f5f5f5", // Light gray background color
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Center the content vertically
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            align="center"
            gutterBottom
          >
            Don't have an account? &nbsp;
            <Link href="/userregister" underline="hover" variant="subtitle2">
              Register
            </Link>
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form noValidate onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
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
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
