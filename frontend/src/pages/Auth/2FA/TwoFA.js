import React, { useState, useContext } from "react";
import { api } from "services/api";
import { AuthContext } from "../../../contexts/AuthContext";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";

function TwoFASetup() {
  const { authState } = useContext(AuthContext);
  const { employerAuthState } = useContext(EmployerAuthContext);
  const [secret, setSecret] = useState("");
  const [dataURL, setDataURL] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  async function generateSecret() {
    try {
      const response = await api.get("/twofa/generate-secret", {
        withCredentials: true,
      });
      const data = response.data;
      setSecret(data.secret);
      setDataURL(data.dataURL);
    } catch (error) {
      console.error("Error generating secret:", error);
    }
  }

  async function verifyToken() {
    try {
      const response = await api.post(
        "/twofa/verify-token",
        {
          token,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setMessage(data);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  if (!(authState || employerAuthState)) {
    return <div>You must be logged in to view this page</div>;
  }

  return (
    <div>
      <button onClick={generateSecret}>Generate Secret</button>
      {dataURL && (
        <img src={dataURL} alt="Scan this QR code with Google Authenticator" />
      )}
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter Token"
      />
      <button onClick={verifyToken}>Verify Token</button>
      {message && <div>{message}</div>}
    </div>
  );
}

export default TwoFASetup;
