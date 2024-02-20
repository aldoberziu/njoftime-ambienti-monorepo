const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String },
  role: { type: String },
  timeJoined: { type: Number },
  emails: [String],
  phoneNumbers: [String],
  favorites: [String],
  myFeeds: [String],
});

// userSchema.virtual('company', {
//   ref: 'User',
//   foreignField: 'user',
//   localField: '_id',
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
