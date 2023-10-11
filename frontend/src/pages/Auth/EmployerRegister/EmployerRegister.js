import React, { useState } from "react";
import { api } from 'services/api';
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Business as BusinessIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

function EmployerRegister() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };
  const validatePin = (pin) => {
    return /^\d{6}$/.test(pin);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-]).{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!companyName || !email || !password || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePin(pin)) {
      setMessage("Pin must be a 6-digit number.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must meet the requirements listed below.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(
        "employer/register",
        {
          companyName,
          email,
          password,
          pin,
        }
      );
      setMessage("Employer registered");
      navigate("/employerlogin");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Unable to register. Please try again later.");
      }
    }
  };

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
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Employer Register
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            align="center"
            gutterBottom
          >
            Already have an account? &nbsp;
            <Link href="/employer-login" underline="hover" variant="subtitle2">
              Log in
            </Link>
          </Typography>
          {message && (
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mt: 2, color: "red" }}
            >
              {message}
            </Typography>
          )}
          <form noValidate onSubmit={handleRegister}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="email"
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
                placeholder="6-digit Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                InputProps={{
                  inputProps: { maxLength: 6 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
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
              <TextField
                fullWidth
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                Password must:
                <ul>
                  <li>Be at least 8 characters long</li>
                  <li>Include both uppercase and lowercase characters</li>
                  <li>Contain at least one number</li>
                  <li>Have at least one special character (e.g., !@#$%^&*-)</li>
                </ul>
              </Typography>
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EmployerRegister;
