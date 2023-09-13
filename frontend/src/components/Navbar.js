import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { EmployerAuthContext } from "../contexts/EmployerAuthContext"; // Make sure the path is correct

function Navbar() {
  const { authState, logout } = useContext(AuthContext);
  const { employerAuthState, employerLogout } = useContext(EmployerAuthContext);

  useEffect(() => {
    // this will cause a re-render whenever authState or employeeAuthState changes
  }, [authState, employerAuthState]);
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

  // Navbar for users who are logged in as 'employee'
  const employerNavbar = (
    <div>
      <span>Home</span>
      <span>Dashboard</span> {/* Adjust as necessary */}
      <span>Settings</span>
      <span onClick={employerLogout}>Logout</span> {/* Adjust as necessary */}
    </div>
  );

  if (authState) {
    return userNavbar;
  }

  if (employerAuthState) {
    return employerNavbar;
  }

  return notLoggedInNavbar;
}

export default Navbar;
