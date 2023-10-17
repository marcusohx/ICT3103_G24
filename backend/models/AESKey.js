const mongoose = require("mongoose");

const aesKeySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  aesKey: { type: String, required: true },
});

module.exports = mongoose.model("AESKey", aesKeySchema);