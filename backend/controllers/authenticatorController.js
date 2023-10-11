const otplib = require('otplib');
const User = require("../models/User");
const speakeasy = require("speakeasy");



// Controller for enabling 2FA
exports.enable2FA = async (req, res) => {
    const { userId } = req.user; // Assuming you have authentication middleware
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Generate a TOTP secret key
    const secret = speakeasy.generateSecret();
  
    // Store the TOTP secret and mark 2FA as enabled
    user.totpSecret = secret.base32;
    user.is2FAEnabled = true;
    await user.save();
  
    // Generate an OTP authentication URL for the user
    const otpAuthURL = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: user.email, 
      issuer: "SiTgigs", 
    });
  
    res.json({otpAuthURL});
  };
  
  // Controller for verifying 2FA
  exports.verify2FA = async (req, res) => {
    const { userId } = req.user; // Assuming you have authentication middleware
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const { token } = req.body;
  
    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: "base32",
      token,
    });
  
    if (verified) {
      return res.status(200).json({ message: "2FA verified successfully" });
    } else {
      return res.status(401).json({ message: "Invalid 2FA token" });
    }
  };