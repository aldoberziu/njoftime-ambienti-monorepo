const Users = require("../models/users");

exports.create = async (req, res, next) => {
  const userId = req.session.getUserId();
  const user = await Users.findById(userId);
  if (!user) {
    req.body._id = req.session.getUserId();
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
exports.addToFavourite = async (req,res,next) => {
  // const userId = req.session.getUserId();
  // const loggedUser = await Users.findById(userId);
  // const updatedUser = await Users.findByIdAndUpdate(loggedUser, {
  //   favorites
  // })
  // e lam ktu
}
