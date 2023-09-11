import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword || !userType) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/user/register", {
        email,
        username,
        password,
        userType,
      });
      setMessage("User created");
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
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  href="/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate onSubmit={handleRegister}
            >
              <Stack spacing={3}>
                <TextField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
          </div>
        </Box>
      </Box>
  );
}

export default Register;
