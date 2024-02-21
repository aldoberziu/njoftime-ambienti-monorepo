const mongoose = require("mongoose");
const User = require("./users");

const feedSchema = new mongoose.Schema(
  {
    category: { type: String },
    furnishing: { type: String, enum: ["E pamobiluar", "Pjesërisht e mobiluar", "E mobiluar"] },
    toilet: { type: String },
    description: { type: String },
    capacity: { type: String },
    location: {
      country: { type: String },
      city: { type: String },
      zone: { type: String },
      street: { type: String },
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
    company: { type: String },
    // companyName: { type: String },
    favorites: { type: String },
    // companyLogo: { type: Object },
    // email: { type: String },
    // phone: { type: String },
    active: { type: Boolean, default: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
