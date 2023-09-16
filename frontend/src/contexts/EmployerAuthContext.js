import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EmployerAuthContext = createContext();

export function EmployerAuthProvider({ children }) {
  const [employerAuthState, setEmployerAuthState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(employerAuthState);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/employer/login", credentials, {
        withCredentials: true,
      });
      await fetchEmployerData();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const employerlogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3001/employer/logout",
        {},
        { withCredentials: true }
      );
      setEmployerAuthState(null);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployerAuthContext.Provider
      value={{ employerAuthState, loading, error, login, employerlogout }}
    >
      {children}
    </EmployerAuthContext.Provider>
  );
}
