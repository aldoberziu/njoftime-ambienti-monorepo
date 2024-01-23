const express = require("express");
const users = require("../controllers/users");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

const router = express.Router();

router.route("/").get(users.all).delete(users.delete);
router.route("/:id").get(users.one).delete(users.delete);

router.use(verifySession())

router.route('/addToFavorite').patch(users.addToFavourite)
router.route('/').post(users.create);

module.exports = router;
