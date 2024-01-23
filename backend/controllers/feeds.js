const Feeds = require("../models/feeds");
const Plans = require("../models/plans");
const ApiFeatures = require("../utils/apiFeatures");
const { structures } = require("../constants");

exports.create = async (req, res, next) => {
  const standardPlan = await Plans.findById("1");
  req.body.createdAt = Date.now().valueOf();
  req.body.expiresAt = req.body.createdAt + standardPlan.duration;

  const newFeed = await Feeds.create(req.body);

  res.status(201).json({
    status: "success",
    data: newFeed,
  });
  next();
};
exports.one = async (req, res, next) => {
  const feed = await Feeds.findById(req.params.id);

  if (!feed) {
    res.status(404).json({
      status: "success",
      message: "Document not found!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: feed,
    });
  }
  next();
};
exports.filterOptions = async (req, res, next) => {
  let { city, zone, structure, minP, maxP } = req.query;

  let feeds = [];
  let filteredFeeds = [];
  let matchStrQuery = {};
  let matchNumQuery = {};
  matchStrQuery.$or = [];
  matchNumQuery.$and = [];
  if (!!city || !!zone || !!structure) {
    if (!!city) {
      matchStrQuery.$or.push({ "location.city": { $regex: `^${city}$` } });
    }
    if (!!zone) {
      matchStrQuery.$or.push({ "location.zone": { $regex: `^${zone}$` } });
    }
    if (!!structure) {
      matchStrQuery.$or.push({ structure: { $regex: `^${structure}$` } });
    }
  }
  if (!!minP || !!maxP) {
    if (!!minP) {
      matchNumQuery.$and.push({ price: { $gt: Number(minP) } });
    }
    if (!!maxP) {
      matchNumQuery.$and.push({ price: { $lt: Number(maxP) } });
    }
  }

  if (matchNumQuery.$and.length !== 0) {
    filteredFeeds = await Feeds.aggregate([{ $match: matchNumQuery }]);
  }
  if (matchStrQuery.$or.length !== 0) {
    filteredFeeds = await Feeds.aggregate([{ $match: matchStrQuery }]);
  }
  if (filteredFeeds.length !== 0) {
    for (let i = 0; i < filteredFeeds.length; i++) {
      feeds.push(filteredFeeds[i]);
    }
  }

  res.status(200).json({
    status: "success",
    data: feeds,
  });
  next();
};
exports.search = async (req, res, next) => {
  const search = req.params.searchValue;
  const searchElements = search.split(" ");
  let searchWords = searchElements.filter((item) => isNaN(item));

  function matchingElements(searchWords, structures) {
    return structures.filter((item) => {
      return searchWords.some((word) => item.structure.toLowerCase().includes(word.toLowerCase()));
    });
  }
  const matchingStructures = matchingElements(searchWords, structures);
  const regexPatterns = matchingStructures.map((el) => new RegExp(el._id, "i"));

  let searchedFeeds = [];
  for (let i = 0; i < regexPatterns.length; i++) {
    let feeds = await Feeds.aggregate([
      {
        $match: {
          $or: [{ structure: { $regex: regexPatterns[i] } }],
        },
      },
    ]);
    for (let i = 0; i < feeds.length; i++) {
      if (feeds.length !== 0) {
        searchedFeeds.push(feeds[i]);
      }
    }
  }
  // const feed = await rangeFeeds.find({
  //   $or: [
  //     { "location.city": { $regex: regexPatterns[i] } },
  //     { "location.zone": { $regex: regexPatterns[i] } },
  //     { structure: { $regex: regexPatterns[i] } },
  //   ],
  // });
  // if (feed.length !== 0) {
  //   searchedFeeds.push(feed[0]);
  // }

  res.status(200).json({
    status: "success",
    data: searchedFeeds,
  });
  next();
};
exports.all = async (req, res, next) => {
  const filters = new ApiFeatures(Feeds.find(), req.query).filter();

  const feeds = await filters.query;

  res.status(200).json({
    status: "success",
    data: feeds,
  });
  next();
};
exports.delete = async (req, res, next) => {
  if (req.params.id) {
    const feed = await Feeds.findByIdAndDelete(req.params.id);

    if (!feed) {
      res.status(404).json({
        status: "fail",
        message: `No feed found with id: ${req.params.id}! Please try another one.`,
      });
    } else {
      res.status(204).json({
        status: "success",
        message: "Document just got deleted successfully!",
      });
    }
  }
  next();
};
exports.updatePlan = async (req, res, next) => {
  const modifiedAt = Date.now().valueOf();
  const newPlan = await Plans.findById(req.body.activePlan);
  const expiresAt = modifiedAt + newPlan.duration;
  const updatedFeed = await Feeds.findByIdAndUpdate(
    req.params.id,
    {
      activePlan: req.body.activePlan,
      expiresAt: expiresAt,
      modifiedAt: modifiedAt,
    },
    {
      new: true,
      runValidators: true,
      returnDocument: "after",
    }
  );
  res.status(200).json({
    status: "success",
    data: updatedFeed,
  });
  next();
};
