const mongoose = require("mongoose");

const Feed = mongoose.model(
  "Feed",
  new mongoose.Schema({
    category: { type: String },
    furnishing: { type: String, enum: ["E pamobiluar", "Pjesërisht e mobiluar", "E mobiluar"] },
    toilet: { type: String },
    capacity: { type: String },
    location: {
      city: {
        type: String,
      },
      zone: { type: String },
      country: { type: String },
    },
    area: { type: String },
    floor: { type: Number },
    elevator: { type: Boolean },
    garage: { type: Boolean },
    structure: { type: String },
    price: { type: Number },
    currency: { type: String, enum: ["USD", "EUR", "LEK"] },
    rooms: { type: String },
    // discountedPrice: { type: Number },    ????
    //extra auto generated data ↓
    createdAt: { type: Number },
    modifiedAt: { type: Number },
    expiresAt: { type: Number },
    activePlan: { type: String, default: "1" },
    companyId: { type: String },
    companyName: { type: String },
    favorites: { type: String },
    companyLogo: { type: Object },
    email: { type: String },
    phone: { type: String },
    active: { type: Boolean, default: true },
  })
);

module.exports = Feed;
