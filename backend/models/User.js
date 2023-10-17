const mongoose = require("mongoose");
const fieldEncryption = require("mongoose-field-encryption");
const AESKey = require("../models/AESKey"); 


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Added username field
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 },
  linkedinLink: { type: String, default: "" }, // Added linkedinLink field with a default value of empty string
  twoFASecret: { type: String, default: "" },
  twoFAEnabled: { type: Boolean, default: false }, // Optional: to know if 2FA is enabled for the user
  tempAuthToken: { type: String }, // Added tempAuthToken field
});

// Encryption Configuration
userSchema.plugin(fieldEncryption, {
  fields: ["twoFASecret"],
  secret: async (document) => {
    // Retrieve the AES key associated with the user
    const aesKeyRecord = await AESKey.findOne({ userId: document._id });
    return aesKeyRecord.aesKey;
  },
});


module.exports = mongoose.model("User", userSchema);
