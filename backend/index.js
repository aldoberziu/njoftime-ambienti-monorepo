const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const backendConfig = require("../config/backendConfig.ts");
const { getWebsiteDomain } = require("../config/appInfo.ts");
const Multitenancy = require("supertokens-node/recipe/multitenancy");
const supertokens = require("supertokens-node");
const feeds = require("./routes/feeds.js");
const plans = require("./routes/plans.js");
const users = require("./routes/users.js");

supertokens.init(backendConfig);

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://aldoberziu:LNTVBarIiahhKgpQ@cluster0.do5p57m.mongodb.net/"
  )
  .then(() => console.log("DB CONNECTED SUCKESSFULLY!!!"))

app.use(
  cors({
    origin: getWebsiteDomain(),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
  let session = req.session;
  res.send({
    sessionHandle: session.getHandle(),
    userId: session.getUserId(),
    accessTokenPayload: session.getAccessTokenPayload(),
  });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
app.get("/tenants", async (req, res) => {
  let tenants = await Multitenancy.listAllTenants();
  res.send(tenants);
});

app.use("/feeds", feeds);
app.use("/plans", plans);
app.use("/users", users);

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));

//"start": "npx ts-node-dev --project ./tsconfig.json ./index.ts"
