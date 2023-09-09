import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { authState, logout } = useContext(AuthContext);

  // Navbar for users who are not logged in
  const notLoggedInNavbar = (
    <div>
      <Link to="/">Home</Link>
      <span>About</span>
      <Link to="/login">Login</Link>
      <Link to="/Register">Register</Link>
    </div>
  );

  // Navbar for users who are logged in as 'user'
  const userNavbar = (
    <div>
      <span>Home</span>
      <span>Profile</span>
      <span>Settings</span>
      <span onClick={logout}>Logout</span>
    </div>
  );

  // Navbar for users who are logged in as 'employer'
  const employerNavbar = (
    <div>
      <span>Home</span>
      <span>Dashboard</span>
      <span>Settings</span>
      <span onClick={logout}>Logout</span>
    </div>
  );

  if (!authState) {
    return notLoggedInNavbar;
  }

  return authState.userType === "employer" ? employerNavbar : userNavbar;
}

export default Navbar;
