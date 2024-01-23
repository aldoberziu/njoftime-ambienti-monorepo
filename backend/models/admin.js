const mongoose = require("mongoose");

const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    _id: { type: String },
    email: { type: String },
    role: { type: String },
  })
);

module.exports = Admin;
