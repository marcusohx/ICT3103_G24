import React, { useState, useContext } from "react";
import { api } from "services/api";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [enteredPin, setEnteredPin] = useState("");
  const [error, setError] = useState(null);
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const { login } = useContext(AuthContext);
  const [tempAuthToken, setTempAuthToken] = useState(null);
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

      if (response.status === 206) {
        setTempAuthToken(response.data.tempAuthToken); // Store the temporary auth token
        setPinDialogOpen(true); // Open the 2FA dialog if 2FA is required
      } else if (response.status === 200) {
        await login({ email, password });
        navigate("/");
      } else {
        setError(response.data || "An error occurred");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data || "An error occurred");
      } else if (error.request) {
        setError("No response received from server. Please try again later.");
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
      console.error(error);
    }
  };
  const verifyPinAndCloseJob = async () => {
    if (!tempAuthToken) {
      setError("Please log in to verify 2FA");
      return;
    }
    try {
      // Replace the URL and request body with your actual verify 2FA endpoint and request body
      const response = await api.post(
        "/twofa/verify-2fa",
        {
          email,
          token: enteredPin,
          tempAuthToken,
          type: "user",
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setPinDialogOpen(false);
        await login({ email, password });
        navigate("/");
      } else {
        setError("Verification failed");
      }
    } catch (error) {
      setError("An error occurred while verifying the pin");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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

      <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)}>
        <DialogTitle>Enter 2FA Code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the 2FA code sent to your device to continue.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="2fa-code" // adjusted id
            label="2FA Code" // adjusted label
            type="text" // for obfuscation
            fullWidth
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPinDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={verifyPinAndCloseJob} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;
