const Users = require("../models/users");
const UserMetadata = require("supertokens-node/recipe/usermetadata");
const supertokens = require("supertokens-node");

exports.create = async (req, res, next) => {
  const userId = req.params.id;
  let userInfo = await supertokens.getUser(userId);
  const user = await Users.findById(userId);
  if (!user) {
    const { id, timeJoined, emails, phoneNumbers } = userInfo;
    req.body = { _id: id, timeJoined, emails, phoneNumbers };

    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } else {
    res.status(200).json({
      status: "success",
    });
    next();
  }
  next();
};
exports.one = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.all = async (req, res, next) => {
  let allUsers = await Users.find();
  if (allUsers.length === 0) {
    res.status(200).json({
      status: "success",
      message: "There are no documents in the database.",
    });
  }
  res.status(200).json({
    status: "success",
    data: allUsers,
  });
  next();
};
exports.delete = async (req, res, next) => {
  if (req.params.id) {
    const user = await Users.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: `No user found with id: ${req.params.id}! Please try another one.`,
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
exports.addToFavourite = async (req, res, next) => {
  const { userId, feedId } = req.body;
  let alreadyFavorited;
  const loggedUser = await Users.findById(userId);
  loggedUser.favorites.map((el) => {
    if (el === feedId) {
      alreadyFavorited = true;
    }
  });
  if (alreadyFavorited === true) {
    await Users.updateOne({ _id: userId }, { $pull: { favorites: feedId } });
  } else {
    await Users.updateOne({ _id: userId }, { $push: { favorites: feedId } });
  }
};
