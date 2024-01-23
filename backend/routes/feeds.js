const express = require("express");
const feeds = require("../controllers/feeds");
const plans = require("../controllers/plans");
const isExpiring = require("../utils/isExpiring");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

const router = express.Router();

router.route("/").get(feeds.all).post(feeds.create);

router.route("/filter").get(feeds.filterOptions);
router.route("/search/:searchValue").get(feeds.search);

router.route("/:id").get(verifySession(), isExpiring, feeds.one).delete(feeds.delete);
router.route("/:id/plans").get(plans.all).patch(feeds.updatePlan);
module.exports = router;
