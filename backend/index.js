const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const { middleware, errorHandler } = require("supertokens-node/framework/express");

const PasswordlessNode = require("supertokens-node/recipe/passwordless");
const SessionNode = require("supertokens-node/recipe/session");
const Dashboard = require("supertokens-node/recipe/dashboard");
const UserRoles = require("supertokens-node/recipe/userroles");
const Multitenancy = require("supertokens-node/recipe/multitenancy");
const supertokens = require("supertokens-node");
const UserMetadata = require("supertokens-node/recipe/usermetadata");
const dotenv = require("dotenv");

const feeds = require("./routes/feeds.js");
const plans = require("./routes/plans.js");
const users = require("./routes/users.js");

dotenv.config({ path: "./.env" });

const apiBasePath = "/api/auth/";
const getApiDomain = () => {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
};
const getWebsiteDomain = () => {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
};

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.connectionURI,
    apiKey: process.env.apiKey,
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    websiteDomain: getWebsiteDomain(),
    apiDomain: getWebsiteDomain(),
    // websiteDomain: getWebsiteDomain(),
    // apiDomain: getApiDomain(),
    apiBasePath,
  },
  recipeList: [
    PasswordlessNode.init({
      flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
      contactMethod: "EMAIL_OR_PHONE",
    }),
    SessionNode.init(),
    Dashboard.init(),
    UserRoles.init(),
    UserMetadata.init(),
  ],
  isInServerlessEnv: true,
});

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

mongoose.connect(process.env.DB).then(() => console.log("DB CONNECTED SUCKESSFULLY!!!"));

app.use(
  cors({
    origin: 'http://localhost:3000',//website domain always
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

app.use("/api/feeds", feeds);
app.use("/api/plans", plans);
app.use("/api/users", users);

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));

//"start": "npx ts-node-dev --project ./tsconfig.json ./index.ts"
