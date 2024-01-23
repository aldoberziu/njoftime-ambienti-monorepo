const Feed = require("../models/feeds");

const isFeedExpiring = async (req, res, next) => {
  const feed = await Feed.find();
  const currentDate = Date.now();
  
  //check if it is his feed that is expiring

  //3 days before expiration
  if (feed.expiresAt < currentDate + 86400000) {
    console.log("Please renew your subscription cuz time runnin late nigga!");
  }
  return next();
};

module.exports = isFeedExpiring;
