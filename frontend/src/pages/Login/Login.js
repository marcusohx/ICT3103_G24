import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom"; // Import useHistory

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Instantiate useHistory

  const handleLogin = async () => {
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
      console.log(response.data);

      await login({ email, password }); // call the login function from AuthContext

      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
