import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/user-data", {
        withCredentials: true,
      });
      setAuthState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (credentials) => {
    try {
      await axios.post("http://localhost:3001/user/login", credentials, {
        withCredentials: true,
      });
      await fetchUserData();
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
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
