import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      console.log(response.data);

      login({ username, password }); // call the login function from AuthContext
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
