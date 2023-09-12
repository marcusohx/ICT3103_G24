import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import UserLogin from "./pages/Auth/UserLogin/Login.js";
import EmployerLogin from "./pages/Auth/EmployerLogin/EmployerLogin.js";

import UserRegister from "./pages/Auth/UserRegister/Register.js";
import EmployerRegister from "./pages/Auth/EmployerRegister/EmployerRegister.js";
import ChooseRole from "./pages/Auth/ChooseRole/ChooseRoleLogin/ChooseRoleLogin.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { AuthProvider } from "./contexts/AuthContext";
import { EmployerAuthProvider } from "./contexts/EmployerAuthContext"; // Import the EmployerAuthProvider

function App() {
  return (
    <AuthProvider>
      <EmployerAuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/employerlogin" element={<EmployerLogin />} />
              <Route path="/userregister" element={<UserRegister />} />
              <Route path="/employerregister" element={<EmployerRegister />} />
              <Route path="/chooserole" element={<ChooseRole />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </EmployerAuthProvider>
    </AuthProvider>
  );
}

export default App;
