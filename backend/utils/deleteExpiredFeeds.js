const Feed = require("../models/feeds");

const deleteExpiredFeeds = async (req, res, next) => {
  const currentDate = Date.now();
  // if (feed.expiresAt < currentDate) {
  //   await Feed.findByIdAndUpdate(req.params.id, { active: false });
  // }
  const allFeeds = await Feed.find();
  for (let i = 0; i < allFeeds.length; i++) {
    if (allFeeds[i].expiresAt < currentDate) {
      await Feed.findByIdAndDelete(allFeeds[i]._id);
    }
  }
  next();
};

setInterval(deleteExpiredFeeds, 1000 * 60 * 60)

module.exports = deleteExpiredFeeds;
