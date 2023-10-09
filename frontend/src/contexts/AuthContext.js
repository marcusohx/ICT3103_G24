import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);
  const [refresh, setRefresh] = useState(false); // New state for refreshing

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/user-data", {
        withCredentials: true,
      });
      // console.log(response.data);
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
      await axios.post("http://localhost:3001/user/login", credentials, {
        withCredentials: true,
      });
      await fetchUserData(); // Fetch user data again after logging in
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/user/logout",
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
