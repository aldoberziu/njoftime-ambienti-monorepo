const mongoose = require("mongoose");

const Plan = mongoose.model(
  "Plan",
  new mongoose.Schema({
    _id: { type: String },
    title: { type: String },
    items: [String],
    message: { type: String },
    price: { type: String },
    color: { type: String },
    duration: { type: Number },
  })
);

module.exports = Plan;
