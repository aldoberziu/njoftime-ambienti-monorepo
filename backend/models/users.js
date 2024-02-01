const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: { type: String },
    role: { type: String },
    timeJoined: { type: Number },
    emails: [String],
    phoneNumbers: [String],
    favorites: [String],
  })
);

module.exports = User;
