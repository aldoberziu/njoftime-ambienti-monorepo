const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    _id: { type: String },
    email: { type: String },
    //ktu do shtosh nji plansCategory dmth
    //kur ai t blej nji plan me virtual population ti do
    //i shtosh planCategory: "number" qe m pas do e aksesosh 
    //te feeds.create()
    //populate me tgjitha feeldsat e planit jo vetem planCategory
  })
);

module.exports = Customer;
