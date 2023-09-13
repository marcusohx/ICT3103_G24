import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import UserLogin from "./pages/Auth/UserLogin/Login.js";
import EmployerLogin from "./pages/Auth/EmployerLogin/EmployerLogin.js";

import UserRegister from "./pages/Auth/UserRegister/Register.js";
import EmployerRegister from "./pages/Auth/EmployerRegister/EmployerRegister.js";
import ChooseRole from "./pages/Auth/ChooseRole/ChooseRoleLogin/ChooseRoleLogin.js";
import JobListings from "./pages/JobListing/JobListingPage.js";
import CreateJobListingPage from "./pages/JobListing/CreateJobListing/CreateJobListing.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { AuthProvider } from "./contexts/AuthContext";
import { EmployerAuthProvider } from "./contexts/EmployerAuthContext"; // Import the EmployerAuthProvider

function App() {
  return (
    <Router>
      <AuthProvider>
        <EmployerAuthProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/employerlogin" element={<EmployerLogin />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/employerregister" element={<EmployerRegister />} />
              <Route path="/chooserole" element={<ChooseRole />} />
              <Route path="/joblistings" element={<JobListings />} />
              <Route
                path="/createjoblisting"
                element={<CreateJobListingPage />}
              />
            </Routes>
            <Footer />
          </div>
        </EmployerAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
