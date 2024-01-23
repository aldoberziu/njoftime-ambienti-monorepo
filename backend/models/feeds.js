const mongoose = require("mongoose");

const Feed = mongoose.model(
  "Feed",
  new mongoose.Schema({
    category: { type: String },
    furnishing: { type: String, enum: [ 'E pamobiluar', 'Pjesërisht e mobiluar', 'E mobiluar' ] },
    toilet: { type: String },
    capacity: { type: String },
    location: { 
      city: {
        type: String,
        enum: ['Tiranë', 'Berat', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Himarë', 'Kavajë', 'Korçë', 'Krujë', 'Kukës', 'Lezhë', 'Lushnjë', 'Përmet', 'Peshkopi', 'Pogradec', 'Pukë', 'Sarandë', 'Shkodër', 'Skrapar', 'Tepelenë', 'Tropojë', 'Vlorë'],
      },
      zone: { type: String },
     },
    area: { type: String },
    floor: { type: Number },
    elevator: { type: Boolean },
    garage: { type: Boolean },
    structure: { type: String },
    price: { type: Number },
    rooms: { type: String },
    // discountedPrice: { type: Number },    ????
    //extra auto generated data ↓
    createdAt: { type: Number },
    modifiedAt: { type: Number },
    expiresAt: { type: Number },
    activePlan: { type: String, default: "1"},
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
