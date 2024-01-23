const express = require("express");
const plans = require("../controllers/plans");

const router = express.Router();

router.route("/").get(plans.all).post(plans.create);

router.route("/:id").delete(plans.delete);

module.exports = router;
