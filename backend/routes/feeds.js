const express = require("express");
const feeds = require("../controllers/feeds");
const plans = require("../controllers/plans");
const isExpiring = require("../utils/isExpiring");
const deleteExpired = require("../utils/deleteExpiredFeeds");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

const router = express.Router();

router.route("/:id/plans").get(plans.all).patch(feeds.updatePlan);
router.route("/:id").get(isExpiring, feeds.one).delete(feeds.delete);

router.route("/filter").get(feeds.filterOptions);

router.route("/search/:searchValue").get(feeds.search);

router.route("/").get( deleteExpired, feeds.all).post(feeds.create);

module.exports = router;
