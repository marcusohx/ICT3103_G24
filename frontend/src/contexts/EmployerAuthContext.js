import React, { createContext, useState, useEffect } from "react";
import { api } from 'services/api';

export const EmployerAuthContext = createContext();

export function EmployerAuthProvider({ children }) {
  const [employerAuthState, setEmployerAuthState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployerData = async () => {
    try {
      const response = await api.get(
        "employer/employer-data",
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
      await api.post("employer/login", credentials, {
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
      await api.post(
        "employer/logout",
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
