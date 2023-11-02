import React, { useState } from "react";
import { api } from "services/api";
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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePin = (pin) => {
    return /^\d{6}$/.test(pin);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/;

    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !recaptchaValue
    ) {
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

    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    try {
      //recaptcha response
      const recaptchaResponse = await api.post("user/recaptcha", {
        token: recaptchaValue,
      });

      if (recaptchaResponse.data.success) {
        //register response
        const response = await api.post("user/register", {
          firstName,
          lastName,
          email,
          username,
          password,
          pin,
        });
        setMessage("User created");
        navigate("/userlogin");
      } else {
        setMessage("reCAPTCHA verification failed");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(JSON.stringify(error.response.data));
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
            Register
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            align="center"
            gutterBottom
          >
            Already have an account? &nbsp;
            <Link href="/userlogin" underline="hover" variant="subtitle2">
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
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          toggleConfirmPasswordVisibility("confirmPassword")
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
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
            {
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            }
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

export default Register;
