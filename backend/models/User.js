const mongoose = require("mongoose");
const fieldEncryption = require("mongoose-field-encryption");
const AESKey = require("../models/AESKey");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobListing" }],
  credits: { type: Number, default: 0 },
  linkedinLink: { type: String, default: "" },
  twoFASecret: { type: String, default: "" },
  twoFAEnabled: { type: Boolean, default: false },
  tempAuthToken: { type: String },
});

userSchema.pre("save", async function (next) {
  try {
    // Fetch the AES key
    if (this.twoFAEnabled) {
      const aesKeyRecord = await AESKey.findOne({ userId: this._id });
      if (!aesKeyRecord || !aesKeyRecord.aesKey) {
        throw new Error("AES key not found or is invalid");
      }

      // Encrypt the twoFASecret field
      fieldEncryption.encrypt(this, ["twoFASecret"], aesKeyRecord.aesKey);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("find", async function () {
  // Try to decrypt the twoFASecret field for fetched data
  this.execPopulate().then((docs) => {
    for (let doc of docs) {
      // Check if twoFAEnabled is true before decryption
      if (doc.twoFAEnabled) {
        AESKey.findOne({ userId: doc._id })
          .then((aesKeyRecord) => {
            if (!aesKeyRecord || !aesKeyRecord.aesKey) {
              throw new Error("AES key not found or is invalid");
            }
            fieldEncryption.decrypt(doc, ["twoFASecret"], aesKeyRecord.aesKey);
          })
          .catch((error) => console.error(error));
      }
    }
  });
});
module.exports = mongoose.model("User", userSchema);
