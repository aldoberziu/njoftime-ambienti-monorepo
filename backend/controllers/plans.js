const Plans = require("../models/plans");

exports.create = async (req, res, next) => {
  const newPlan = await Plans.create(req.body);
  res.status(201).json({
    status: "success",
    data: newPlan,
  });
  next();
};
exports.all = async (req, res, next) => {
  let allPlans = await Plans.find();
  if (allPlans.length === 0) {
    res.status(200).json({
      status: "success",
      message: "There are no documents in the database.",
    });
  }
  res.status(200).json({
    status: "success",
    data: allPlans,
  });
  next();
};
exports.delete = async (req, res, next) => {
  if (req.params.id) {
    const plan = await Plans.findByIdAndDelete(req.params.id);

    if (!plan) {
      res.status(404).json({
        status: "fail",
        message: `No plan found with id: ${req.params.id}! Please try another one.`,
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
