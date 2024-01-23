const mongoose = require("mongoose");

const Realtor = mongoose.model(
  "Realtor",
  new mongoose.Schema({
    _id: { type: String },
    email: { type: String },
  })
);

module.exports = Realtor;
