const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: { type: String },
    email: { type: String },
    role: { type: String },
  })
);

module.exports = User;
