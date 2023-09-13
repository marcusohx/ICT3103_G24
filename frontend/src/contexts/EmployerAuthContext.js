import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EmployerAuthContext = createContext();

export function EmployerAuthProvider({ children }) {
  const [employerAuthState, setEmployerAuthState] = useState(null);

  const fetchEmployerData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/employer/employer-data",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setEmployerAuthState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const login = async (credentials) => {
    try {
      await axios.post("http://localhost:3001/employer/login", credentials, {
        withCredentials: true,
      });
      await fetchEmployerData();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/employer/logout",
        {},
        { withCredentials: true }
      );
      setEmployerAuthState(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmployerAuthContext.Provider value={{ employerAuthState, login, logout }}>
      {children}
    </EmployerAuthContext.Provider>
  );
}
