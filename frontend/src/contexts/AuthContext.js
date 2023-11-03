import React, { createContext, useState, useEffect } from "react";
import { api } from 'services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);
  const [refresh, setRefresh] = useState(false); // New state for refreshing

  const fetchUserData = async () => {
    try {
      const response = await api.get("user/user-data", {
        withCredentials: true,
      });
      setAuthState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle the refresh state
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data whenever the component mounts or refresh changes
  }, [refresh]);

  const login = async (credentials) => {
    try {
      await api.post("user/login", credentials, {
        withCredentials: true,
      });
      await fetchUserData(); // Fetch user data again after logging in
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await api.post(
        "user/logout",
        {},
        { withCredentials: true }
      );
      setAuthState(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, toggleRefresh }}>
      {children}
    </AuthContext.Provider>
  );
}
