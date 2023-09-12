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
      <Link to="/chooserole">Login</Link>
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

  if (!authState) {
    return notLoggedInNavbar;
  }

  return userNavbar;
}

export default Navbar;
