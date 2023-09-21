import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material"; // Import Box from MUI
import Home from "./pages/Home/Home.js";
import UserLogin from "./pages/Auth/UserLogin/Login.js";
import EmployerLogin from "./pages/Auth/EmployerLogin/EmployerLogin.js";

import UserRegister from "./pages/Auth/UserRegister/Register.js";
import EmployerRegister from "./pages/Auth/EmployerRegister/EmployerRegister.js";
import ChooseRole from "./pages/Auth/ChooseRole/ChooseRoleLogin/ChooseRoleLogin.js";
import JobListings from "./pages/JobListing/JobListingPage.js";
import CreateJobListingPage from "./pages/JobListing/CreateJobListing/CreateJobListing.js";
import EmployerJobListings from "./pages/JobListing/EmployerJobListings/EmployerJobListings.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { AuthProvider } from "./contexts/AuthContext";
import { EmployerAuthProvider } from "./contexts/EmployerAuthContext"; // Import the EmployerAuthProvider
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme.js";
import AcceptUser from "./pages/JobListing/AcceptUser/AcceptUser.js";
import Profile from "./pages/Profile/Profile.js";
import UpdateJobListingPage from "./pages/JobListing/UpdateJobListing/UpdateJobListing.js";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <EmployerAuthProvider>
            <div className="App">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Navbar />
                <Box sx={{ flex: "1 0 auto" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userlogin" element={<UserLogin />} />
                    <Route path="/employerlogin" element={<EmployerLogin />} />
                    <Route path="/userregister" element={<UserRegister />} />
                    <Route
                      path="/employerregister"
                      element={<EmployerRegister />}
                    />
                    <Route path="/chooserole" element={<ChooseRole />} />
                    <Route path="/joblistings" element={<JobListings />} />
                    <Route
                      path="/createjoblisting"
                      element={<CreateJobListingPage />}
                    />
                    <Route path="/acceptuser/:jobId" element={<AcceptUser />} />
                    <Route
                      path="/employerjoblistings"
                      element={<EmployerJobListings />}
                    />
                    <Route path="/user/profile" element={<Profile />} />
                    <Route
                      path="/updatejoblisting/:id"
                      element={<UpdateJobListingPage />}
                    />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </div>
          </EmployerAuthProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
