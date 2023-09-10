import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom"; // Import useHistory
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState("email"); // Add state for the selected method

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Instantiate useHistory

  const handleLogin = async () => {
    try {
      // const response = await axios.post(
      //   "http://localhost:3001/user/login",
      //   {
      //     email,
      //     password,
      //   },
      //   {
      //     withCredentials: true, // Ensure credentials are included
      //   }
      // );
      //console.log(response.data);

      await login({ email, password }); // call the login function from AuthContext

      navigate("/"); // Redirect to the home page
      
    } catch (error) {
      console.log(error);
    }
  };

  // Add a function to handle method change
  const handleMethodChange = (event, newValue) => {
    setMethod(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
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
              Login
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Don&apos;t have an account?
              &nbsp;
            </Typography>
          </Stack>
          {method === 'email' && (
            <form
              noValidate
              onSubmit={handleLogin}
            >
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
                onClick={(handleLogin)}
              >
                Login
              </Button>
            </form>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Login;
