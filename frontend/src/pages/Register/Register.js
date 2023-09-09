import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

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
    <div>
      {message && <div className="message">{message}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="" disabled>
          Select User Type
        </option>
        <option value="employer">employer</option>
        <option value="user">user</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
