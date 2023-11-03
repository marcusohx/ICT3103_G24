import React, { useState, useContext } from "react";
import { api } from "services/api";
import { AuthContext } from "../../../contexts/AuthContext";
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";

function TwoFASetup({ open, onClose, updateTwoFAMessage }) {
  const { authState } = useContext(AuthContext);
  const { employerAuthState } = useContext(EmployerAuthContext);
  // const [secret, setSecret] = useState("");
  const [dataURL, setDataURL] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(30); // The initial countdown value

  async function generateSecret() {
    if (!isGenerating) {
      // Lock the button and start the countdown
      setIsGenerating(true);
      let countdownValue = 30; // Set the initial countdown time (in seconds)

      const countdownInterval = setInterval(() => {
        countdownValue -= 1;
        setCountdown(countdownValue);

        if (countdownValue === 0) {
          // Unlock the button when the countdown reaches 0
          clearInterval(countdownInterval);
          setIsGenerating(false);
          setCountdown(30); // Reset the countdown
        }
      }, 1000);

      try {
        // Step 1: Generate the two-factor authentication secret
        const response = await api.get("/twofa/generate-secret", {
          withCredentials: true,
        });
        const data = response.data;
        // setSecret(data.secret);

        setDataURL(data.dataURL);
      } catch (error) {
        console.error("Error generating secret:", error);
      }
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
      // Check if verification was successful
      if (data === "Two-factor authentication verified successfully") {
        updateTwoFAMessage("2FA verified successfully");

        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        updateTwoFAMessage("2FA verification failed");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      updateTwoFAMessage("Error verifying 2FA");
    }
  }

  if (!(authState || employerAuthState)) {
    return <div>You must be logged in to view this page</div>;
  }

  return (
    <div>
      <div>
        <div>
          <p>Step 1: Generate QR code</p>
          <button onClick={generateSecret} disabled={isGenerating}>
            {isGenerating ? `Generating... (${countdown}s)` : "Generate Secret"}
          </button>
        </div>
        <div>
          <p>Step 2: Scan the QR code in Google Authenticator</p>
          {dataURL && (
            <img
              src={dataURL}
              alt="Scan this QR code with Google Authenticator"
            />
          )}
        </div>
        <div>
          <p>Step 3: Enter the code shown in Google Authenticator</p>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter Token"
          />
        </div>
        <div>
          <p>Step 4: Press Verify</p>
          <button onClick={verifyToken}>Verify</button>
        </div>
      </div>
      {message && <div>{message}</div>}
    </div>
  );
}

export default TwoFASetup;
